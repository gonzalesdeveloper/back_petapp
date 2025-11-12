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
exports.eventoController = void 0;
const database_1 = __importDefault(require("../database"));
class EventoController {
    listEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            try {
                // 1️⃣ Obtener todos los eventos
                const [eventos] = yield database_1.default.query('SELECT * FROM evento');
                if (!eventos.length) {
                    return res.json({
                        data: [],
                        status: true,
                        message: 'No hay eventos registrados'
                    });
                }
                // 2️⃣ Obtener todos los asistentes
                const [asistentes] = yield database_1.default.query(`
            SELECT ea.IdEvento, p.IdPersona, p.Nombres, p.Foto
            FROM evento_asistencia ea
            INNER JOIN persona p ON ea.IdPersona = p.IdPersona
            WHERE ea.Estado = 'asistir'
          `);
                // 3️⃣ Asociar asistentes a sus eventos
                const data = eventos.map((evento) => {
                    const personas = asistentes.filter((a) => a.IdEvento === evento.IdEvento);
                    const asistire = personas.some((a) => a.IdPersona == IdPersona);
                    return Object.assign(Object.assign({}, evento), { Asistentes: personas.slice(0, 3), TotalAsistentes: personas.length, Asisitire: asistire });
                });
                // 4️⃣ Devolver todo en una sola respuesta
                res.json({
                    data,
                    status: true,
                    message: 'Eventos y asistentes obtenidos correctamente'
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Error al listar eventos con asistentes',
                    error
                });
            }
        });
    }
    setAsistent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdEvento, IdPersona } = req.body;
            try {
                // Verificar si ya existe
                const [existe] = yield database_1.default.query('SELECT * FROM evento_asistencia WHERE IdEvento = ? AND IdPersona = ?', [IdEvento, IdPersona]);
                if (existe.length > 0) {
                    // Si existe, eliminar (cancelar asistencia)
                    yield database_1.default.query('DELETE FROM evento_asistencia WHERE IdEvento = ? AND IdPersona = ?', [IdEvento, IdPersona]);
                    return res.json({ message: 'Asistencia cancelada', asistiendo: false });
                }
                else {
                    // Si no existe, insertar (asistir)
                    yield database_1.default.query('INSERT INTO evento_asistencia (IdEvento, IdPersona) VALUES (?, ?)', [IdEvento, IdPersona]);
                    return res.json({ message: 'Asistencia registrada', asistiendo: true });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al registrar asistencia' });
            }
        });
    }
}
exports.eventoController = new EventoController();
