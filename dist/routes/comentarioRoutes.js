"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentarioController_1 = require("../controllers/comentarioController");
class ComentarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:IdDoctor', comentarioController_1.comentarioController.getComentarioDoctor);
    }
}
const comentarioRoutes = new ComentarioRoutes();
exports.default = comentarioRoutes.router;
