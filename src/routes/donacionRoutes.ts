import { Router } from "express";
import { donacionController } from "../controllers/donacionController";

class DonacionRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/create', donacionController.insertDonacion);
        this.router.get('/listmethod/:IdFundacion', donacionController.listMetodoDonacion);
        this.router.get('/list-donation/:IdPersona', donacionController.listDonacion);
    }
}

const donacionRoutes = new DonacionRoutes();
export default donacionRoutes.router;