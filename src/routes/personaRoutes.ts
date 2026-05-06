import { Router } from "express";
import { upload } from "../config/multer.config";
import { personaController } from "../controllers/personaController";
import { verifyToken } from "../middleware/auth.middleware";


class PersonaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', personaController.getPerson);
        this.router.get('/listtypeperson/:IdPersona', personaController.getOnePerson);
        this.router.put('/update/:IdPersona', personaController.editPerson);
        this.router.put(
            '/update-photo',
            verifyToken,
            upload.single('photo'),
            (req, res) => {
              personaController.editPhoto(req, res);
            }
        );
    }
}

const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;