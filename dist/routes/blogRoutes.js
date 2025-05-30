"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
class BlogRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', blogController_1.blogController.listBlog);
    }
}
const blogRoutes = new BlogRoutes();
exports.default = blogRoutes.router;
