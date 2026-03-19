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
exports.adopcionController = void 0;
const database_1 = __importDefault(require("../database"));
class AdopcionController {
    setStateAdoption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona, IdMascotaAdopcion, Mensaje } = req.body;
            console.log(IdPersona, IdMascotaAdopcion);
            const conn = yield database_1.default.getConnection();
            try {
                yield conn.beginTransaction(); // ✅ CORRECTO
                console.log('Inicio transacción');
                // 🔹 1. Validar duplicado
                const [existe] = yield conn.query(`
        SELECT * 
        FROM solicitud_adopcion 
        WHERE IdPersona = ? AND IdMascotaAdopcion = ?
      `, [IdPersona, IdMascotaAdopcion]);
                console.log('Existe:', existe);
                if (existe.length > 0) {
                    yield conn.rollback();
                    return res.status(409).json({
                        ok: false,
                        message: "Ya existe una solicitud para esta mascota"
                    });
                }
                // 🔹 2. Validar estado mascota
                const [estadoMascota] = yield conn.query(`
        SELECT Estado
        FROM mascota_adopcion
        WHERE IdMascotaAdopcion = ?
      `, [IdMascotaAdopcion]);
                console.log('Estado mascota:', estadoMascota);
                if (!estadoMascota.length) {
                    yield conn.rollback();
                    return res.status(404).json({
                        ok: false,
                        message: 'Mascota no encontrada'
                    });
                }
                if (estadoMascota[0].Estado === 'Adoptado') {
                    yield conn.rollback();
                    return res.status(409).json({
                        ok: false,
                        message: "La mascota ya fue adoptada"
                    });
                }
                // 🔹 3. Insertar solicitud
                const [result] = yield conn.query(`
        INSERT INTO solicitud_adopcion 
        (IdPersona, IdMascotaAdopcion, Fecha_Solicitud, Estado_Solicitud, Mensaje) 
        VALUES (?, ?, NOW(), 'Pendiente', ?)
      `, [IdPersona, IdMascotaAdopcion, Mensaje]);
                const IdSolicitud = result.insertId;
                console.log('Solicitud creada:', IdSolicitud);
                // 🔹 4. Insertar historial
                yield conn.query(`
        INSERT INTO adopcion_historial
        (IdSolicitud, EstadoAnterior, EstadoNuevo, FechaCambio)
        VALUES (?, NULL, 'Pendiente', NOW())
      `, [IdSolicitud]);
                console.log('Historial insertado');
                yield conn.commit();
                console.log('Commit OK');
                return res.json({
                    ok: true,
                    message: "Solicitud enviada correctamente",
                    IdSolicitud
                });
            }
            catch (error) {
                console.error('ERROR BACKEND:', error);
                yield conn.rollback();
                return res.status(500).json({
                    ok: false,
                    message: "Error interno del servidor",
                    detail: error.message
                });
            }
            finally {
                conn.release();
            }
        });
    }
    listAdoption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            const [list] = yield database_1.default.query(`SELECT sa.IdSolicitud, sa.Estado_Solicitud, sa.Fecha_Solicitud, p.Nombre, tm.Descripcion AS Tipo, r.Descripcion AS Raza, c.Descripcion AS Color, p.Foto 
      FROM solicitud_adopcion sa
      INNER JOIN mascota_adopcion ma 
        ON sa.IdMascotaAdopcion = ma.IdMascotaAdopcion
      INNER JOIN pet p
        ON ma.IdPet = p.IdPet
      INNER JOIN tipomascota tm
        ON p.IdTipoMascota = tm.IdTipoMascota
      INNER JOIN raza r
        ON p.IdRaza = r.IdRaza
      INNER JOIN color c
        ON p.IdColor = c.IdColor
      WHERE sa.IdPersona = ?
      ORDER BY sa.Fecha_Solicitud DESC;`, [IdPersona]);
            res.json({
                status: true,
                message: 'Todo Ok',
                data: list
            });
        });
    }
    actualizarEstadoSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdSolicitud, EstadoNuevo } = req.body;
            const conn = yield database_1.default.getConnection();
            try {
                yield conn.beginTransaction();
                // 1. obtener estado actual
                const [rows] = yield conn.query(`
        SELECT Estado, IdMascotaAdopcion, IdPersona
        FROM solicitud_adopcion
        WHERE IdSolicitud = ?
      `, [IdSolicitud]);
                const solicitud = rows[0];
                const estadoAnterior = solicitud.Estado;
                // 2. actualizar estado
                yield conn.query(`
        UPDATE solicitud_adopcion
        SET Estado = ?
        WHERE IdSolicitud = ?
      `, [EstadoNuevo, IdSolicitud]);
                // 3. guardar historial
                yield conn.query(`
        INSERT INTO adopcion_historial
        (IdSolicitud, EstadoAnterior, EstadoNuevo, FechaCambio)
        VALUES (?, ?, ?, NOW())
      `, [IdSolicitud, estadoAnterior, EstadoNuevo]);
                yield conn.commit();
                res.json({ ok: true });
            }
            catch (error) {
                yield conn.rollback();
                res.status(500).json(error);
            }
            finally {
                conn.release();
            }
        });
    }
}
exports.adopcionController = new AdopcionController();
