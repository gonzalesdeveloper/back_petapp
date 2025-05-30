"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petController_1 = require("../controllers/petController");
class PetRoutes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.routes.get('/list', petController_1.petController.listPet);
    }
}
const petRoutes = new PetRoutes();
exports.default = petRoutes.routes;
