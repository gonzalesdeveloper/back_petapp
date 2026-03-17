import { Router } from "express";
import { adopcionController } from "../controllers/adopcionController";

class AdoptionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/crear', adopcionController.setStateAdoption);
        this.router.get('/list_adoption/:IdPersona', adopcionController.listAdoption);
    }
}

const adoptionRoutes = new AdoptionRoutes();
export default adoptionRoutes.router;