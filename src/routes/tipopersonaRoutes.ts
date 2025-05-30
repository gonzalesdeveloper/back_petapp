import { Router } from "express";
import { tipoPersonaController } from "../controllers/tipopersonaController";


class TipoPersonaRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', tipoPersonaController.getTipoPersona);
    }
}

const tipoPersonaRoutes = new TipoPersonaRoutes();
export default tipoPersonaRoutes.router;