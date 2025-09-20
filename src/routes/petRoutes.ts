import { Router } from 'express';
import { petController } from '../controllers/petController';

class PetRoutes{
    public routes: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.routes.get('/list', petController.listPetLost)
    }
}

const petRoutes = new PetRoutes();
export default petRoutes.routes;