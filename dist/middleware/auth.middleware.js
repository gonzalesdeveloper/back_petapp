"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* carga variable de entorno */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyToken(req, res, next) {
    console.log(res.locals.user);
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }
    const bearerToken = token.toString().replace('Bearer ', '');
    jsonwebtoken_1.default.verify(bearerToken, process.env.ACCESS_SECRET || 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        res.locals.user = decoded;
        /* req.body.user = decoded */
        next();
    });
}
exports.verifyToken = verifyToken;
