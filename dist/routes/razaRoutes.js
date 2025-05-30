"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const razaController_1 = require("../controllers/razaController");
class RazaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', razaController_1.razaController.listRaza);
    }
}
const razaRoutes = new RazaRoutes();
exports.default = razaRoutes.router;
