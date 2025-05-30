"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaController_1 = require("../controllers/personaController");
class PersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', personaController_1.personaController.getPerson);
        this.router.get('/listtypeperson/:id', personaController_1.personaController.getTypePerson);
    }
}
const personaRoutes = new PersonaRoutes();
exports.default = personaRoutes.router;
