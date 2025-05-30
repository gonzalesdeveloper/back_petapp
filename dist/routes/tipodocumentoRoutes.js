"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipodocumentoController_1 = require("../controllers/tipodocumentoController");
class TipoDocumentoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', tipodocumentoController_1.tipoDocumentoController.getTipoDocumento);
    }
}
const tipoDocumentoRoutes = new TipoDocumentoRoutes();
exports.default = tipoDocumentoRoutes.router;
