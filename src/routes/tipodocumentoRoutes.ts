import { Router } from "express";
import { tipoDocumentoController } from "../controllers/tipodocumentoController";


class TipoDocumentoRoutes{

    router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', tipoDocumentoController.getTipoDocumento);
    }
}

const tipoDocumentoRoutes = new TipoDocumentoRoutes();
export default tipoDocumentoRoutes.router;