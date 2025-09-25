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
exports.doctorFavController = void 0;
const database_1 = __importDefault(require("../database"));
class DoctorFavController {
    listDoctorFav(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            const list = yield database_1.default.query('SELECT d.IdDoctor, p.Nombres, p.Apellidos, d.Presentacion, p.Foto, d.Rating from Doctor d INNER JOIN Persona p ON d.IdPersona = p.IdPersona INNER JOIN  favdoc fav ON d.IdDoctor = fav.IdDoctor WHERE fav.IdPersona = ?', [IdPersona]);
            res.json({
                status: true,
                message: 'Todo correcto',
                data: list
            });
        });
    }
}
exports.doctorFavController = new DoctorFavController();
