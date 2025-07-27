import { Router } from "express";
import { especialidadController } from "../controllers/especialidadController";

class EspecialidadRouter{
    router: Router = Router();
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', especialidadController.listEspecialidad);
    }
}

const especialidadRouter = new EspecialidadRouter();
export default especialidadRouter.router;