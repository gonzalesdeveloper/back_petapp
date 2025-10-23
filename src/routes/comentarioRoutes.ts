import { Router } from "express";
import { comentarioController } from "../controllers/comentarioController";

class ComentarioRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/listdoc/:IdDoctor', comentarioController.getComentarioDoctor);
        this.router.post('/create', comentarioController.createComentarioDoctor);
        this.router.get('/listvet/:IdVeterinaria', comentarioController.getComentarioVet);
    }
}

const comentarioRoutes = new ComentarioRoutes();
export default comentarioRoutes.router;