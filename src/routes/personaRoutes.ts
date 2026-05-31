import { Router } from "express";
import { personaController } from "../controllers/personaController";
import { verifyToken } from "../middleware/auth.middleware";
import { createUpload } from '../config/multer.config';

export const uploadUser =
  createUpload('users', 'user');


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
            uploadUser.single('photo'),
            (req, res) => {
              personaController.editPhoto(req, res);
            }
        );
    }
}

const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;