import { Router } from "express"
import { doctorController } from "../controllers/doctorController";

class DoctorRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list/:IdPersona', doctorController.getDoctorsHome);
        this.router.post('/fav', doctorController.doctorFavorito);
        this.router.get('/detail/:IdDoctor', doctorController.getDetailDoctor);
    }
} 

const doctorRoutes = new DoctorRoutes();
export default doctorRoutes.router;
