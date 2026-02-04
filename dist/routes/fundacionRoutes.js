"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fundacionController_1 = require("../controllers/fundacionController");
class FundacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', fundacionController_1.fundacionController.getFundations);
    }
}
const fundacionRoutes = new FundacionRoutes();
exports.default = fundacionRoutes.router;
