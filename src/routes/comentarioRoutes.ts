import { Router } from "express";
import { comentarioController } from "../controllers/comentarioController";

class ComentarioRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/list/:IdDoctor', comentarioController.getComentarioDoctor);
    }
}

const comentarioRoutes = new ComentarioRoutes();
export default comentarioRoutes.router;