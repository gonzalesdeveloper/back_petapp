import { Router } from "express";
import { doctorespecialistaController } from "../controllers/doctorespecialidadController";

class DoctorEspecialidadRoutes{
    router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/list/:IdDoctor', doctorespecialistaController.listDoctorEspecialidad);
    }
}

const doctorespecialidadRoutes = new DoctorEspecialidadRoutes();
export default doctorespecialidadRoutes.router;