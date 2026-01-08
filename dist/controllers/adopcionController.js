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
            try {
                const { IdPersona, IdAdopcion, MensajeOpcional } = req.body;
                yield database_1.default.query(`INSERT INTO solicitud_adopcion 
                (IdPersona, IdAdopcion, Fecha_Solicitud, EstadoSolicitud, MensajeOpcional) 
                VALUES (?, ?, NOW(), 'ENVIADA', ?)`, [IdPersona, IdAdopcion, MensajeOpcional]);
                return res.json({ ok: true, message: "Solicitud enviada correctamente" });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ ok: false, error });
            }
        });
    }
}
exports.adopcionController = new AdopcionController();
