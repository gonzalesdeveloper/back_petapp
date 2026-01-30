"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petFavController_1 = require("../controllers/petFavController");
class PetFavRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:IdPersona', petFavController_1.petFavController.getFavPet);
        this.router.post('/fav', petFavController_1.petFavController.petFav);
    }
}
const petFavRoutes = new PetFavRoutes();
exports.default = petFavRoutes.router;
