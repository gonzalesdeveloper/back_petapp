"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donacionController_1 = require("../controllers/donacionController");
class DonacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', donacionController_1.donacionController.insertDonacion);
        this.router.get('/listmethod/:IdFundacion', donacionController_1.donacionController.listMetodoDonacion);
        this.router.get('/list-donation/:IdPersona', donacionController_1.donacionController.listDonacion);
    }
}
const donacionRoutes = new DonacionRoutes();
exports.default = donacionRoutes.router;
