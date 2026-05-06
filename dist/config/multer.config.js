"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users/');
    },
    filename: (req, file, cb) => {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.IdPersona) || Date.now();
        const ext = path_1.default.extname(file.originalname);
        cb(null, `user-${userId}${ext}`);
    }
});
exports.upload = (0, multer_1.default)({ storage });
