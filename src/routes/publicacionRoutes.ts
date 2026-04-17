import { Router } from "express";
import { publicacionController } from "../controllers/publicacionController";

class PublicacionRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/crear', publicacionController.newPublicacion);
        this.router.get('/list_aprobada', publicacionController.listPubliAprobadas);
        this.router.patch('/aprobar_publi', publicacionController.AprobarPublicacion);
        this.router.patch('/aprobar_publi', publicacionController.RechazarPublicacion);
    }
}

const publicacionRoutes = new PublicacionRoutes();
export default publicacionRoutes.router;