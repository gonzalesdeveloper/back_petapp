import { Router } from "express";
import { fundacionController } from "../controllers/fundacionController";

class FundacionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', fundacionController.getFundations);
        this.router.get('/listselect', fundacionController.getFundations);
        this.router.get('/listone/:IdFundacion', fundacionController.getOneFundation);
    }
}

const fundacionRoutes = new FundacionRoutes();
export default fundacionRoutes.router;