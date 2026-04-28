"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
/* middleware */
const auth_middleware_1 = require("./middleware/auth.middleware");
/* rutas */
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const personaRoutes_1 = __importDefault(require("./routes/personaRoutes"));
const tipopersonaRoutes_1 = __importDefault(require("./routes/tipopersonaRoutes"));
const tipodocumentoRoutes_1 = __importDefault(require("./routes/tipodocumentoRoutes"));
const razaRoutes_1 = __importDefault(require("./routes/razaRoutes"));
const categoriaRoutes_1 = __importDefault(require("./routes/categoriaRoutes"));
const vetRoutes_1 = __importDefault(require("./routes/vetRoutes"));
const notificacionRoutes_1 = __importDefault(require("./routes/notificacionRoutes"));
const colorRoutes_1 = __importDefault(require("./routes/colorRoutes"));
const tipoMascotaRoutes_1 = __importDefault(require("./routes/tipoMascotaRoutes"));
const eventoRoutes_1 = __importDefault(require("./routes/eventoRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const especialidadRouter_1 = __importDefault(require("./routes/especialidadRouter"));
const doctorespecialidadRoutes_1 = __importDefault(require("./routes/doctorespecialidadRoutes"));
const comentarioRoutes_1 = __importDefault(require("./routes/comentarioRoutes"));
const doctorFavRoutes_1 = __importDefault(require("./routes/doctorFavRoutes"));
const petFavRoutes_1 = __importDefault(require("./routes/petFavRoutes"));
const tipofundacionRoutes_1 = __importDefault(require("./routes/tipofundacionRoutes"));
const fundacionRoutes_1 = __importDefault(require("./routes/fundacionRoutes"));
const donacionRoutes_1 = __importDefault(require("./routes/donacionRoutes"));
const adoptionRoutes_1 = __importDefault(require("./routes/adoptionRoutes"));
const publicacionRoutes_1 = __importDefault(require("./routes/publicacionRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/auth', authRoutes_1.default);
        /* verifica si el token existe o si ya venció */
        this.app.use(auth_middleware_1.verifyToken);
        this.app.use('/api/pet', petRoutes_1.default);
        this.app.use('/api/person', personaRoutes_1.default);
        this.app.use('/api/tipoperson', tipopersonaRoutes_1.default);
        this.app.use('/api/tipodocumento', tipodocumentoRoutes_1.default);
        this.app.use('/api/raza', razaRoutes_1.default);
        this.app.use('/api/categoria', categoriaRoutes_1.default);
        this.app.use('/api/vet', vetRoutes_1.default);
        this.app.use('/api/noti', notificacionRoutes_1.default);
        this.app.use('/api/color', colorRoutes_1.default);
        this.app.use('/api/tipomascota', tipoMascotaRoutes_1.default);
        this.app.use('/api/evento', eventoRoutes_1.default);
        this.app.use('/api/blog', blogRoutes_1.default);
        this.app.use('/api/doctor', doctorRoutes_1.default);
        this.app.use('/api/especialidad', especialidadRouter_1.default);
        this.app.use('/api/docesp', doctorespecialidadRoutes_1.default);
        this.app.use('/api/comentario', comentarioRoutes_1.default);
        this.app.use('/api/favdoc', doctorFavRoutes_1.default);
        this.app.use('/api/favpet', petFavRoutes_1.default);
        this.app.use('/api/tipo_f', tipofundacionRoutes_1.default);
        this.app.use('/api/fundacion', fundacionRoutes_1.default);
        this.app.use('/api/donacion', donacionRoutes_1.default);
        this.app.use('/api/adoption', adoptionRoutes_1.default);
        this.app.use('/api/publicacion', publicacionRoutes_1.default);
    }
    start() {
        const port = this.app.get('port');
        this.app.listen(port, () => {
            console.log('✅ Servidor corriendo en puerto', port);
        });
    }
}
exports.Server = Server;
const server = new Server();
server.start();
