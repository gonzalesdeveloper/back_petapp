import { Router } from "express";
import { categoriaController } from "../controllers/categoriaController";

class CategoriaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', categoriaController.listCategoria);
        this.router.get('/listimportant', categoriaController.listCategoriaImportant);
    }
}

const categoriaRoutes = new CategoriaRoutes();
export default categoriaRoutes.router;