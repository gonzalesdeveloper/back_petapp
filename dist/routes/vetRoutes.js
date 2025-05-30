"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vetController_1 = require("../controllers/vetController");
class VetRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', vetController_1.vetController.listVet);
    }
}
const vetRoutes = new VetRoutes();
exports.default = vetRoutes.router;
