"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUser = void 0;
const express_1 = require("express");
const personaController_1 = require("../controllers/personaController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_config_1 = require("../config/multer.config");
exports.uploadUser = (0, multer_config_1.createUpload)('users', 'user');
class PersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', personaController_1.personaController.getPerson);
        this.router.get('/listtypeperson/:IdPersona', personaController_1.personaController.getOnePerson);
        this.router.put('/update/:IdPersona', personaController_1.personaController.editPerson);
        this.router.put('/update-photo', auth_middleware_1.verifyToken, exports.uploadUser.single('photo'), (req, res) => {
            personaController_1.personaController.editPhoto(req, res);
        });
    }
}
const personaRoutes = new PersonaRoutes();
exports.default = personaRoutes.router;
