"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* carga variable de entorno */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const refresh = process.env.REFRESH_SECRET;
const access = process.env.ACCESS_SECRET;
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, access, {
        expiresIn: '30m'
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, refresh, {
        expiresIn: '7d'
    });
};
exports.generateRefreshToken = generateRefreshToken;
