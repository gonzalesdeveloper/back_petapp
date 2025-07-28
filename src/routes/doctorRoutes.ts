import { Router } from "express"
import { doctorController } from "../controllers/doctorController";

class DoctorRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list/:IdPersona', doctorController.getDoctors);
        this.router.post('/fav', doctorController.doctorFavorito);
    }
} 

const doctorRoutes = new DoctorRoutes();
export default doctorRoutes.router;
