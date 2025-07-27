"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const especialidadController_1 = require("../controllers/especialidadController");
class EspecialidadRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', especialidadController_1.especialidadController.listEspecialidad);
    }
}
const especialidadRouter = new EspecialidadRouter();
exports.default = especialidadRouter.router;
