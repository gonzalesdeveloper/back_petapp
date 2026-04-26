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
class ComentarioController {
    /* COMENTARIOS HACIA EL DOCTOR */
    getComentarioDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdDoctor } = req.params;
            const [list] = yield database_1.default.query('SELECT c.IdComentario, c.IdPersona, p.Nombres, p.Apellidos, p.Foto, c.Titulo, c.Descripcion, c.Rating, c.Fecha, c.comentable_id, c.comentable_typo, c.Estado FROM comentario c INNER JOIN persona p ON c.IdPersona = p.IdPersona WHERE comentable_typo = ? AND comentable_id = ?', ['doctor', IdDoctor]);
            res.json({
                message: 'Todo Correcto',
                status: true,
                data: list
            });
        });
    }
    /* async createComentarioDoctor(req: Request, res: Response){
        const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;


        await pool.query('INSERT INTO comentario (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado) VALUES (?,?,?,?,NOW(),?,?,1)',
        [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]);

        res.json({
            message: 'Creado Correctamente',
            status: true,
        });
    } */
    createComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;
                // 🔒 Validaciones básicas
                if (!IdPersona || !Descripcion || !Rating || !comentable_id || !comentable_typo) {
                    return res.status(400).json({
                        status: false,
                        message: 'Datos incompletos'
                    });
                }
                // 🔒 Tipos válidos
                const tablasValidas = {
                    doctor: { tabla: 'doctor', id: 'IdDoctor' },
                    veterinaria: { tabla: 'veterinaria', id: 'IdVeterinaria' },
                    fundacion: { tabla: 'fundacion', id: 'IdFundacion' }
                };
                const config = tablasValidas[comentable_typo];
                if (!config) {
                    return res.status(400).json({
                        status: false,
                        message: 'Tipo inválido'
                    });
                }
                // ✅ 1. Insertar comentario
                yield database_1.default.query(`INSERT INTO comentario 
                (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado) 
                VALUES (?,?,?,?,NOW(),?,?,1)`, [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]);
                // ✅ 2. Calcular promedio
                const [rows] = yield database_1.default.query(`SELECT ROUND(AVG(Rating), 1) as promedio 
                 FROM comentario 
                 WHERE comentable_typo = ? 
                   AND comentable_id = ?`, [comentable_typo, comentable_id]);
                const promedio = rows[0].promedio || 0;
                // ✅ 3. Actualizar tabla correspondiente
                yield database_1.default.query(`UPDATE ${config.tabla} 
                 SET Rating = ? 
                 WHERE ${config.id} = ?`, [promedio, comentable_id]);
                res.json({
                    message: 'Creado Correctamente',
                    status: true,
                    promedio
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Error en el servidor'
                });
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
            res.json({
                message: 'Todo Correcto',
                status: true,
                data: list
            });
        });
    }
}
exports.comentarioController = new ComentarioController();
