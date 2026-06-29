"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentarioController = void 0;
const database_1 = __importDefault(require("../database"));
const response_helper_1 = require("../helpers/response.helper");
class ComentarioController {
    /* COMENTARIOS HACIA EL DOCTOR */
    getComentarioDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdDoctor } = req.params;
            try {
                const [list] = yield database_1.default.query('SELECT c.IdComentario, c.IdPersona, p.Nombres, p.Apellidos, p.Foto, c.Titulo, c.Descripcion, c.Rating, c.Fecha, c.comentable_id, c.comentable_typo, c.Estado FROM comentario c INNER JOIN persona p ON c.IdPersona = p.IdPersona WHERE comentable_typo = ? AND comentable_id = ?', ['doctor', IdDoctor]);
                return (0, response_helper_1.successResponse)(res, 'Lista Correcta', list);
            }
            catch (error) {
                console.log('Listado Comenatario Doctor', error);
                return (0, response_helper_1.errorResponse)(res, 'Error del Servidor');
            }
        });
    }
    createComentario(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;
            if (!IdPersona || !Descripcion || !Rating || !comentable_id || !comentable_typo) {
                return (0, response_helper_1.errorResponse)(res, 'Datos incompletos', 400);
            }
            const tablasValidas = {
                doctor: {
                    tabla: 'doctor',
                    id: 'IdDoctor'
                },
                veterinaria: {
                    tabla: 'veterinaria',
                    id: 'IdVeterinaria'
                },
                fundacion: {
                    tabla: 'fundacion',
                    id: 'IdFundacion'
                }
            };
            const config = tablasValidas[comentable_typo];
            if (!config) {
                return (0, response_helper_1.errorResponse)(res, 'Tipo inválido', 400);
            }
            const conn = yield database_1.default.getConnection();
            try {
                yield conn.beginTransaction();
                // 1. Insertar comentario
                yield conn.query(`INSERT INTO comentario
                (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado)
                VALUES (?, ?, ?, ?, NOW(), ?, ?, 1)`, [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]);
                // 2. Calcular promedio
                const [rows] = yield conn.query(`SELECT ROUND(AVG(Rating),1) AS promedio
                 FROM comentario
                 WHERE comentable_typo = ?
                 AND comentable_id = ?`, [comentable_typo, comentable_id]);
                const promedio = (_b = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.promedio) !== null && _b !== void 0 ? _b : 0;
                // 3. Actualizar rating
                yield conn.query(`UPDATE ${config.tabla}
                 SET Rating = ?
                 WHERE ${config.id} = ?`, [promedio, comentable_id]);
                yield conn.commit();
                return (0, response_helper_1.successResponse)(res, 'Creado correctamente', { promedio });
            }
            catch (error) {
                yield conn.rollback();
                console.error('createComentario:', error);
                return (0, response_helper_1.errorResponse)(res, 'Error en el servidor', 500);
            }
            finally {
                conn.release();
            }
        });
    }
    /* COMENTARIOS HACIA LA VETERINARIA */
    getComentarioVet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdVeterinaria } = req.params;
            const [list] = yield database_1.default.query('SELECT c.IdComentario, c.IdPersona, p.Nombres, p.Apellidos, p.Foto, c.Titulo, c.Descripcion, c.Rating, c.Fecha, c.comentable_id, c.comentable_typo, c.Estado FROM comentario c INNER JOIN persona p ON c.IdPersona = p.IdPersona WHERE comentable_typo = ? AND comentable_id = ?', ['veterinaria', IdVeterinaria]);
            res.json({
                message: 'Todo Correcto',
                status: true,
                data: list
            });
        });
    }
    /* COMENTARIOS HACIA LA FUNDACION */
    getComentarioFundacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdFundacion } = req.params;
            try {
                const [list] = yield database_1.default.query(`SELECT 
                c.IdComentario, 
                c.IdPersona, 
                p.Nombres, 
                p.Apellidos, 
                p.Foto, 
                c.Titulo, 
                c.Descripcion, 
                c.Rating, 
                c.Fecha, 
                c.comentable_id, 
                c.comentable_typo, 
                c.Estado 
            FROM comentario c 
            INNER JOIN persona p ON c.IdPersona = p.IdPersona 
            WHERE c.comentable_typo = ? 
              AND c.comentable_id = ?`, ['fundacion', IdFundacion]);
                return (0, response_helper_1.successResponse)(res, 'Lista Correcta', list);
            }
            catch (error) {
                console.log('Listado Comentario Fundacion', error);
                return (0, response_helper_1.errorResponse)(res, 'Error del Servidor');
            }
        });
    }
}
exports.comentarioController = new ComentarioController();
