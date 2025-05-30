import { Router } from "express";
import { colorController } from "../controllers/colorController";

class ColorRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', colorController.listColor);
    }
}

const colorRoutes = new ColorRoutes();
export default colorRoutes.router;