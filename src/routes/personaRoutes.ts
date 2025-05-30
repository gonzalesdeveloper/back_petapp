import { Router } from "express";
import { personaController } from "../controllers/personaController";


class PersonaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', personaController.getPerson);
        this.router.get('/listtypeperson/:id', personaController.getTypePerson);
    }
}

const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;