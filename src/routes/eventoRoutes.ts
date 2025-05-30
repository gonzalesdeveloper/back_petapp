import { Router } from "express";
import { eventoController } from "../controllers/eventoController";

class EventoRoutes{
    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', eventoController.listEvento);
    }
}

const eventoRoutes = new EventoRoutes();
export default eventoRoutes.router;