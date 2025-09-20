"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorFavController_1 = require("../controllers/doctorFavController");
class DoctorFavRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', doctorFavController_1.doctorFavController.listDoctorFav);
    }
}
const doctorFavRoutes = new DoctorFavRoutes();
exports.default = doctorFavRoutes.router;
