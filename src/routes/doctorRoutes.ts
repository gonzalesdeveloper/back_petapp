import { Router } from "express"
import { doctorController } from "../controllers/doctorController";

class DoctorRoutes{
    router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list/:IdPersona', doctorController.getDoctors);
    }
}

const doctorRoutes = new DoctorRoutes();
export default doctorRoutes.router;
