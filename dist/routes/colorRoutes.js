"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colorController_1 = require("../controllers/colorController");
class ColorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', colorController_1.colorController.listColor);
    }
}
const colorRoutes = new ColorRoutes();
exports.default = colorRoutes.router;
