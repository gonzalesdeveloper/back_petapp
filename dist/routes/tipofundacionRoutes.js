"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipofundacionController_1 = require("../controllers/tipofundacionController");
class TipoFundacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', tipofundacionController_1.tipoFundacionController.getTipo);
    }
}
const tipoFundacionRoutes = new TipoFundacionRoutes();
exports.default = tipoFundacionRoutes.router;
