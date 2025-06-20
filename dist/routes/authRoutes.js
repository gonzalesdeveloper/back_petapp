"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/login', authController_1.authController.login);
        this.router.post('/refresh-token', authController_1.authController.refreshToken);
        this.router.post('/register', authController_1.authController.register);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
