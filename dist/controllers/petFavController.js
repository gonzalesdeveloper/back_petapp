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
exports.petFavController = void 0;
const database_1 = __importDefault(require("../database"));
class PetFavController {
    getFavPet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            const [list] = yield database_1.default.query('SELECT m.IdPet, m.Nombre, m.Apellidos, m.Tipo, m.Edad, m.Peso, m.Foto, f.Fecha FROM favpet f INNER JOIN pet m ON f.IdPet = m.IdPet WHERE f.IdPersona = ? ORDER BY m.Tipo, f.Fecha DESC', [IdPersona]);
            res.json({
                status: true,
                message: 'Todo Ok',
                data: list
            });
        });
    }
    /* pet fav */
    petFav(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona, IdPet } = req.body;
            if (!IdPersona || !IdPet) {
                return res.status(400).json({
                    status: false,
                    message: 'Se requiere IdPersona e IdMascota'
                });
            }
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM favpet WHERE IdPersona = ? AND IdPet = ?', [IdPersona, IdPet]);
                if (rows.length > 0) {
                    yield database_1.default.query('DELETE FROM favpet WHERE IdPersona = ? AND IdPet = ?', [IdPersona, IdPet]);
                    return res.json({
                        status: true,
                        favorite: false,
                        message: 'Eliminado de favoritos'
                    });
                }
                else {
                    yield database_1.default.query('INSERT INTO favpet (IdPersona, IdPet) VALUES (?, ?)', [IdPersona, IdPet]);
                    return res.json({
                        status: true,
                        favorite: true,
                        message: 'Marcado como favorito'
                    });
                }
            }
            catch (error) {
                console.error('Error en mascotaFavorita:', error);
                return res.status(500).json({
                    status: false,
                    message: 'Error en el servidor',
                    error: error.message
                });
            }
        });
    }
}
exports.petFavController = new PetFavController();
