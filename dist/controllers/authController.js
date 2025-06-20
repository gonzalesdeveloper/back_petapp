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
const token_util_1 = require("../utils/token.util");
/* carga variable de entorno */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = 10;
const refresh = process.env.REFRESH_SECRET;
const access = process.env.ACCESS_SECRET;
class AuthController {
    /* LOGIN NORMAL */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Password } = req.body;
            try {
                const rows = yield database_1.default.query('SELECT * FROM PERSONA WHERE Email = ?', [Email]);
                if (rows.length === 0)
                    return res.status(401).json({ error: 'Usuario no encontrado' });
                const user = rows[0];
                const match = yield bcrypt_1.default.compare(Password, user.Password);
                if (!match)
                    return res.status(401).json({ error: 'Contraseña incorrecta' });
                const payload = { IdPersona: user.IdPersona, Email: user.Email };
                const accessToken = (0, token_util_1.generateAccessToken)(payload);
                const refreshToken = (0, token_util_1.generateRefreshToken)(payload);
                res.json({
                    accessToken,
                    refreshToken
                });
                /* const token = jwt.sign({ IdPersona: user.IdPersona, Email: user.Email }, process.env.JWT_SECRET as string, {
                  expiresIn: '2h'
                });
          
                res.json({ message: 'Login exitoso', token }); */
            }
            catch (error) {
                res.status(500).json({ error: 'Error en el login' });
            }
        });
    }
    /* REGISTER NORMAL */
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
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ruta para refrescar token
            const { refreshToken } = req.body;
            try {
                const payload = jsonwebtoken_1.default.verify(refreshToken, refresh); // otro secreto
                const newAccessToken = (0, token_util_1.generateAccessToken)({ IdPersona: payload.IdPersona, Email: payload.Email });
                /* const newAccessToken = jwt.sign({ IdPersona: payload.IdPersona }, access, { expiresIn: '15m' }); */
                res.json({ accessToken: newAccessToken });
            }
            catch (_a) {
                res.status(401).json({ error: 'Refresh token inválido o expirado' });
            }
        });
    }
}
exports.authController = new AuthController();
