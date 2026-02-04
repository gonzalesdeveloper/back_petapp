import { Router } from "express";
import { tipoFundacionController } from "../controllers/tipofundacionController";

class TipoFundacionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', tipoFundacionController.getTipo);
    }
}

const tipoFundacionRoutes = new TipoFundacionRoutes();
export default tipoFundacionRoutes.router;