import { Router } from "express";
import { petFavController } from "../controllers/petFavController";

class PetFavRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/list/:IdPersona', petFavController.getFavPet);
        this.router.post('/fav', petFavController.petFav);
    }
}

const petFavRoutes = new PetFavRoutes();
export default petFavRoutes.router;