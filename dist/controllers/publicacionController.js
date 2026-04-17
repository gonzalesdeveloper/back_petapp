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
exports.publicacionController = void 0;
const database_1 = __importDefault(require("../database"));
class PublicacionController {
    newPublicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { IdPersona, IdPet, TipoPublicacion, Nombre_Contacto, Telefono_Contacto } = req.body;
                if (!IdPersona || !IdPet || !TipoPublicacion) {
                    return res.status(400).json({
                        status: false,
                        message: 'Datos incompletos'
                    });
                }
                const [result] = yield database_1.default.query(`
                INSERT INTO publicacion 
                (IdPersona, IdPet, TipoPublicacion, Estado, Nombre_Contacto, Telefono_Contacto)
                VALUES (?, ?, ?, 'pendiente', ?, ?)
            `, [IdPersona, IdPet, TipoPublicacion, Nombre_Contacto, Telefono_Contacto]);
                res.json({
                    status: true,
                    message: 'Registro Guardado Correctamente',
                    IdPublicacion: result.insertId
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: 'Error en el servidor'
                });
            }
        });
    }
    listPubliAprobadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [list] = yield database_1.default.query(`
            SELECT 
                p.*,
                m.Nombre,
                m.Tipo,
                m.Edad,
    
                ma.Estado AS EstadoAdopcion,
                ma.Vacunas_Completas,
                ma.Castrado,
    
                mp.Lugar_Perdida,
                mp.Fecha_Perdida
    
            FROM publicacion p
            INNER JOIN pet m ON m.IdPet = p.IdPet
    
            LEFT JOIN mascota_adopcion ma ON ma.IdPet = m.IdPet
            LEFT JOIN mascota_perdida mp ON mp.IdPet = m.IdPet
    
            WHERE p.Estado = 'aprobado'
        `);
            res.json({
                status: true,
                message: 'Todo Ok',
                data: list
            });
        });
    }
    AprobarPublicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPublicacion } = req.params;
            if (!IdPublicacion) {
                return res.status(400).json({
                    status: false,
                    message: 'Id requerido'
                });
            }
            yield database_1.default.query(`UPDATE publicacion
        SET Estado = 'aprobado',
            Fecha_Aprobacion = CURRENT_TIMESTAMP
        WHERE IdPublicacion = ?
        `, [IdPublicacion]);
            res.json({
                status: true,
                message: 'Aprobado Correctamente'
            });
        });
    }
    RechazarPublicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPublicacion } = req.params;
            if (!IdPublicacion) {
                return res.status(400).json({
                    status: false,
                    message: 'Id requerido'
                });
            }
            yield database_1.default.query(`UPDATE publicacion
        SET Estado = 'rechazado',
            Fecha_Rechazo = CURRENT_TIMESTAMP
        WHERE IdPublicacion = ?
        `, [IdPublicacion]);
            res.json({
                status: true,
                message: 'Rechazado Correctamente'
            });
        });
    }
    /* para listar en un dashboard angular */
    listPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [list] = yield database_1.default.query(`
            SELECT 
                p.*,
                m.Nombre,
                m.Tipo
            FROM publicacion p
            INNER JOIN pet m ON m.IdPet = p.IdPet
            WHERE p.Estado = 'pendiente'
            ORDER BY p.Fecha_Creacion DESC
        `);
            res.json({
                status: true,
                data: list
            });
        });
    }
}
exports.publicacionController = new PublicacionController();
