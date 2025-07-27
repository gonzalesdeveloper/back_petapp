"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorespecialidadController_1 = require("../controllers/doctorespecialidadController");
class DoctorEspecialidadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:IdDoctor', doctorespecialidadController_1.doctorespecialistaController.listDoctorEspecialidad);
    }
}
const doctorespecialidadRoutes = new DoctorEspecialidadRoutes();
exports.default = doctorespecialidadRoutes.router;
