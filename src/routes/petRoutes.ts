import { Router } from 'express';
import { petController } from '../controllers/petController';

class PetRoutes{
    public routes: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.routes.get('/listlost/:IdPersona', petController.listPetLost);
        this.routes.get('/listonelost/:IdPersona/:IdPet', petController.listPetOneLost);
        this.routes.get('/listadoption', petController.listPetAdoption);
        this.routes.get('/listoneadoption/:IdPersona/:IdPet', petController.listPetOneAdoption);
    }
}

const petRoutes = new PetRoutes();
export default petRoutes.routes;