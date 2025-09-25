import { Router } from "express";
import { doctorFavController } from "../controllers/doctorFavController";

class DoctorFavRoutes{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list/:IdPersona', doctorFavController.listDoctorFav);
    }
}

const doctorFavRoutes = new DoctorFavRoutes();
export default doctorFavRoutes.router;