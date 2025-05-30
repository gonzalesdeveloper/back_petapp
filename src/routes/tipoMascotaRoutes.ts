import { Router } from "express";
import { tipoMascotaController } from "../controllers/tipoMascotaController";

class TipoMascotaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', tipoMascotaController.listTipoMascota);
    }
}

const tipoMascotaRoutes = new TipoMascotaRoutes();
export default tipoMascotaRoutes.router;