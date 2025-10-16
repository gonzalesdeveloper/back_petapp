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
exports.personaController = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
class PersonaController {
    getPerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [list] = yield database_1.default.query("SELECT * FROM persona");
            res.json({
                data: list,
                status: true,
                message: "Todo Correcto"
            });
        });
    }
    getOnePerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            const [list] = yield database_1.default.query('SELECT * FROM persona WHERE IdPersona = ?', [IdPersona]);
            list[0].Password = '';
            const fecha = new Date(list[0].Nacimiento);
            const fechaFormateada = fecha.toISOString().split('T')[0];
            list[0].Nacimiento = fechaFormateada;
            res.json({
                data: list,
                status: true,
                message: 'Todo correcto'
            });
        });
    }
    /* editar persona */
    editPerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            console.log(req.body);
            try {
                if (req.body.password) {
                    req.body.password = yield bcrypt_1.default.hash(req.body.password, saltRounds);
                }
                const fecha = new Date(req.body.Nacimiento);
                const fechaFormateada = fecha.toISOString().split('T')[0];
                req.body.Nacimiento = fechaFormateada;
                yield database_1.default.query('UPDATE persona SET ? WHERE IdPersona = ?', [req.body, IdPersona]);
                res.status(201).json({
                    message: 'Usuario Actualizado',
                    /* data: [] */
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    error: 'Error al Actualizar Usuario'
                });
            }
        });
    }
}
exports.personaController = new PersonaController();
