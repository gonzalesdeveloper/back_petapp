"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorController_1 = require("../controllers/doctorController");
class DoctorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:IdPersona', doctorController_1.doctorController.getDoctors);
        this.router.post('/fav', doctorController_1.doctorController.doctorFavorito);
    }
}
const doctorRoutes = new DoctorRoutes();
exports.default = doctorRoutes.router;
