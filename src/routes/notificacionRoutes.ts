import { Router } from "express";
import { notificacionController } from "../controllers/notificacionController";

class NotificacionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/list/:IdPersona', notificacionController.listNotificacion);
    }
}

const notificacionRoutes = new NotificacionRoutes();
export default notificacionRoutes.router;