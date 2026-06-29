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
const response_helper_1 = require("../helpers/response.helper");
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
            const [list] = yield database_1.default.query(`
            SELECT DISTINCT 
                f.IdFundacion, 
                f.Nombre 
            FROM fundacion f
            INNER JOIN donacionfundacion df 
                ON df.IdFundacion = f.IdFundacion
        `);
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
                    return (0, response_helper_1.errorResponse)(res, 'Fundacion no encontrada', 404);
                }
                const [fotosRows] = yield database_1.default.query('SELECT * FROM fundacion_foto WHERE IdFundacion = ?', [IdFundacion]);
                fundacionRows[0].Fotos = fotosRows;
                return (0, response_helper_1.successResponse)(res, 'Fundacion Encontrada', fundacionRows);
            }
            catch (error) {
                console.log('Fundacion Unica', error);
                return (0, response_helper_1.errorResponse)(res, 'Error del Servidor');
            }
        });
    }
}
exports.fundacionController = new FundacionController;
