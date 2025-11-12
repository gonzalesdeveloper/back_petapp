"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventoController_1 = require("../controllers/eventoController");
class EventoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', eventoController_1.eventoController.listEvento);
        this.router.post('/asistir', eventoController_1.eventoController.setAsistent);
    }
}
const eventoRoutes = new EventoRoutes();
exports.default = eventoRoutes.router;
