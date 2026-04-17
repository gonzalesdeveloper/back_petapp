"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacionController_1 = require("../controllers/publicacionController");
class PublicacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crear', publicacionController_1.publicacionController.newPublicacion);
        this.router.get('/list_aprobada', publicacionController_1.publicacionController.listPubliAprobadas);
        this.router.patch('/aprobar_publi', publicacionController_1.publicacionController.AprobarPublicacion);
        this.router.patch('/aprobar_publi', publicacionController_1.publicacionController.RechazarPublicacion);
    }
}
const publicacionRoutes = new PublicacionRoutes();
exports.default = publicacionRoutes.router;
