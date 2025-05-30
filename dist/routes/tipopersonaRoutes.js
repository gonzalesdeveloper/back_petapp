"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipopersonaController_1 = require("../controllers/tipopersonaController");
class TipoPersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', tipopersonaController_1.tipoPersonaController.getTipoPersona);
    }
}
const tipoPersonaRoutes = new TipoPersonaRoutes();
exports.default = tipoPersonaRoutes.router;
