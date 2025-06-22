"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificacionController_1 = require("../controllers/notificacionController");
class NotificacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:IdPersona', notificacionController_1.notificacionController.listNotificacion);
    }
}
const notificacionRoutes = new NotificacionRoutes();
exports.default = notificacionRoutes.router;
