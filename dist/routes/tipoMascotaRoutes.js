"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoMascotaController_1 = require("../controllers/tipoMascotaController");
class TipoMascotaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', tipoMascotaController_1.tipoMascotaController.listTipoMascota);
    }
}
const tipoMascotaRoutes = new TipoMascotaRoutes();
exports.default = tipoMascotaRoutes.router;
