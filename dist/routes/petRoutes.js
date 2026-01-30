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
        this.routes.get('/list', petController_1.petController.listPetLost);
        this.routes.get('/listone/:IdPet', petController_1.petController.listPetOneLost);
        this.routes.get('/listadoption', petController_1.petController.listPetAdoption);
        this.routes.get('/listoneadoption/:IdPersona/:IdPet', petController_1.petController.listPetOneAdoption);
    }
}
const petRoutes = new PetRoutes();
exports.default = petRoutes.routes;
