import { Router } from "express";
import { fundacionController } from "../controllers/fundacionController";

class FundacionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', fundacionController.getFundations);
    }
}

const fundacionRoutes = new FundacionRoutes();
export default fundacionRoutes.router;