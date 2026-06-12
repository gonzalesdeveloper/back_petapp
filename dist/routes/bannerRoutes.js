"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bannerController_1 = require("../controllers/bannerController");
class BannerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', bannerController_1.bannerController.getListBanners);
    }
}
const bannerRoutes = new BannerRoutes();
exports.default = bannerRoutes.router;
