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
exports.doctorController = void 0;
const database_1 = __importDefault(require("../database"));
class DoctorController {
    getDoctorsHome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            const list = yield database_1.default.query('SELECT d.IdDoctor, p.Nombres, p.Apellidos, p.Direccion, p.Referencia, p.Foto, d.Presentacion, d.Rating, CASE WHEN df.IdPersona IS NULL THEN false ELSE true END AS IsFavourite FROM doctor d INNER JOIN persona p ON d.IdPersona = p.IdPersona LEFT JOIN favdoc df ON d.IdDoctor = df.IdDoctor AND df.IdPersona = ?', [IdPersona]);
            res.json({
                message: 'Todo Correcto',
                status: true,
                data: list
            });
        });
    }
    getDetailDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdDoctor } = req.params;
            const list = yield database_1.default.query('SELECT p.IdPersona, d.IdDoctor, p.Nombres, p.Apellidos, p.Direccion, p.Foto, p.Referencia, d.Rating, d.Presentacion FROM `persona` p inner join doctor d on p.IdPersona = d.IdPersona WHERE d.IdDoctor = ?', [IdDoctor]);
            res.json({
                message: 'Todo Correcto',
                status: true,
                data: list
            });
        });
    }
    doctorFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona, IdDoctor } = req.body;
            if (!IdPersona || !IdDoctor) {
                return res.status(400).json({ status: false, message: 'Se requiere los IDs correspondientes' });
            }
            try {
                const rows = yield database_1.default.query('SELECT * FROM favdoc where IdPersona = ? and IdDoctor = ?', [IdPersona, IdDoctor]);
                if (rows.length > 0) {
                    yield database_1.default.query('DELETE FROM favdoc where IdPersona = ? and IdDoctor = ?', [IdPersona, IdDoctor]);
                    return res.json({
                        message: 'Elimado Correctamente',
                        status: true
                    });
                }
                else {
                    yield database_1.default.query('INSERT INTO FAVDOC (IdPersona, IdDoctor) values (?,?)', [IdPersona, IdDoctor]);
                    return res.json({
                        message: 'Marcado Favorito',
                        status: true
                    });
                }
            }
            catch (error) {
                console.error('Error en doctorFavorito:', error);
                return res.status(500).json({
                    status: false,
                    message: 'Error en el servidor',
                    error: error.message, // 🟧 Añade mensaje para depurar
                });
            }
        });
    }
}
exports.doctorController = new DoctorController();
