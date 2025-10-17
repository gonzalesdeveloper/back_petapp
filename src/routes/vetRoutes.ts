import { Router } from "express";
import { vetController } from "../controllers/vetController";

class VetRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', vetController.listVet);
        this.router.get('/listone/:IdVeterinaria', vetController.listVetUnique);
    }
}

const vetRoutes = new VetRoutes();
export default vetRoutes.router;