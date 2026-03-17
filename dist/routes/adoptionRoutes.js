"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adopcionController_1 = require("../controllers/adopcionController");
class AdoptionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crear', adopcionController_1.adopcionController.setStateAdoption);
        this.router.get('/list_adoption/:IdPersona', adopcionController_1.adopcionController.listAdoption);
    }
}
const adoptionRoutes = new AdoptionRoutes();
exports.default = adoptionRoutes.router;
