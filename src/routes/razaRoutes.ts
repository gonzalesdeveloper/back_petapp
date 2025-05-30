import { Router } from "express";
import { razaController } from "../controllers/razaController";


class RazaRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/list', razaController.listRaza)
    }
}

const razaRoutes = new RazaRoutes();
export default razaRoutes.router;