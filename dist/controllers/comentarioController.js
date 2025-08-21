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
exports.comentarioController = void 0;
const database_1 = __importDefault(require("../database"));
class ComentarioController {
    getComentarioDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdDoctor } = req.params;
            const list = yield database_1.default.query('SELECT * FROM COMENTARIO WHERE comentable_typo = ? AND comentable_id = ?', ['doctor', IdDoctor]);
            res.json({
                message: 'Todo Correcto',
                status: true,
                data: list
            });
        });
    }
    createComentarioDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;
            yield database_1.default.query('INSERT INTO COMENTARIO (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado) VALUES (?,?,?,?,NOW(),?,?,1)', [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]);
            res.json({
                message: 'Creado Correctamente',
                status: true,
            });
        });
    }
}
exports.comentarioController = new ComentarioController();
