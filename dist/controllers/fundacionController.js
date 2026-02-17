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
exports.fundacionController = void 0;
const database_1 = __importDefault(require("../database"));
class FundacionController {
    getFundations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [list] = yield database_1.default.query('SELECT * FROM fundacion');
            res.json({
                status: true,
                message: 'Todo Ok',
                data: list
            });
        });
    }
    getFundationsSelect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [list] = yield database_1.default.query('SELECT IdFundacion, Nombre FROM fundacion');
            res.json({
                status: true,
                message: 'Todo Ok',
                data: list
            });
        });
    }
    getOneFundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { IdFundacion } = req.params;
                const [fundacionRows] = yield database_1.default.query('SELECT * FROM fundacion WHERE IdFundacion = ?', [IdFundacion]);
                if (fundacionRows.length === 0) {
                    res.status(404).json({
                        status: false,
                        message: 'Fundación no encontrada'
                    });
                    return;
                }
                const [fotosRows] = yield database_1.default.query('SELECT * FROM fundacion_foto WHERE IdFundacion = ?', [IdFundacion]);
                fundacionRows[0].Fotos = fotosRows;
                res.json({
                    status: true,
                    message: 'Todo Ok',
                    data: fundacionRows
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: 'Error del servidor'
                });
            }
        });
    }
}
exports.fundacionController = new FundacionController;
