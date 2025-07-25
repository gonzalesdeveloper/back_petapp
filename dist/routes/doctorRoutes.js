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
        this.router.get('/list', doctorController_1.doctorController.getDoctors);
    }
}
const doctorRoutes = new DoctorRoutes();
exports.default = doctorRoutes.router;
