import { Router } from "express";
import { categoriaController } from "../controllers/categoriaController";

class CategoriaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', categoriaController.listCategoria);
    }
}

const categoriaRoutes = new CategoriaRoutes();
export default categoriaRoutes.router;