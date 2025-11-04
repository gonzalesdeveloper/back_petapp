import { Router } from "express";
import { blogController } from "../controllers/blogController";

class BlogRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', blogController.listBlog);
        this.router.get('/listone/:IdBlog', blogController.getBlogOne);
    }
}

const blogRoutes = new BlogRoutes();
export default blogRoutes.router;