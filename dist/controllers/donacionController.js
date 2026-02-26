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
exports.donacionController = void 0;
const database_1 = __importDefault(require("../database"));
class DonacionController {
    insertDonacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdFundacion, IdPersona, Monto, MetodoPago, Mensaje } = req.body;
            yield database_1.default.query('INSERT INTO donacion (IdFundacion, IdPersona, Monto, MetodoPago, Mensaje) values (?,?,?,?,?)', [IdFundacion, IdPersona, Monto, MetodoPago, Mensaje]);
            res.json({
                status: true,
                message: 'Guardado con Éxito'
            });
        });
    }
    listMetodoDonacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdFundacion } = req.params;
            const [list] = yield database_1.default.query('SELECT td.IdTipoDonacion, td.Nombre, td.Icono, td.Req_Datos, fd.Detalle FROM donacionfundacion fd INNER JOIN tipodonacion td ON td.IdTipoDonacion = fd.IdTipoDonacion WHERE fd.IdFundacion = ?;', [IdFundacion]);
            res.json({
                status: true,
                message: 'Todo Ok',
                data: list
            });
        });
    }
    listDonacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            const [list] = yield database_1.default.query('SELECT d.IdDonacion, d.Monto, d.MetodoPago, d.Fecha, d.Estado, f.Nombre   AS Fundacion, f.Ubicacion FROM donacion d INNER JOIN fundacion f ON d.IdFundacion = f.IdFundacion WHERE d.IdPersona = ?', [IdPersona]);
            res.json({
                status: true,
                message: 'Todo Ok',
                data: list
            });
        });
    }
}
exports.donacionController = new DonacionController();
