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
exports.authController = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* carga variable de entorno */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = 10;
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Password } = req.body;
            try {
                const rows = yield database_1.default.query('SELECT * FROM PERSONA WHERE Email = ?', [Email]);
                if (rows.length === 0)
                    return res.status(401).json({ error: 'Usuario no encontrado' });
                const user = rows[0];
                const match = yield bcrypt_1.default.compare(Password, user.Password);
                console.log(match);
                if (!match)
                    return res.status(401).json({ error: 'Contraseña incorrecta' });
                const token = jsonwebtoken_1.default.sign({ IdPersona: user.IdPersona, Email: user.Email }, process.env.JWT_SECRET, {
                    expiresIn: '2h'
                });
                res.json({ message: 'Login exitoso', token });
            }
            catch (error) {
                res.status(500).json({ error: 'Error en el login' });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdTipoPersona, IdTipoDocumento, NumDocumento, Nombres, Apellidos, Direccion, Referencia, Nacimiento, Email, Foto, Usuario, Password, Estado } = req.body;
            try {
                const hashedPassword = yield bcrypt_1.default.hash(Password, saltRounds);
                yield database_1.default.query('INSERT INTO PERSONA (IDTIPOPERSONA, IDTIPODOCUMENTO, NUMDOCUMENTO, NOMBRES, APELLIDOS, DIRECCION, REFERENCIA, NACIMIENTO, EMAIL, FOTO, USUARIO, PASSWORD, ESTADO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [IdTipoPersona, IdTipoDocumento, NumDocumento, Nombres, Apellidos, Direccion, Referencia, Nacimiento, Email, Foto, Usuario, hashedPassword, Estado]);
                res.status(201).json({
                    message: 'Usuario registrado',
                    /* data: [] */
                });
            }
            catch (error) {
                res.status(500).json({
                    error: 'Error al registrar usuario'
                });
            }
        });
    }
}
exports.authController = new AuthController();
