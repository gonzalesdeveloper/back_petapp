"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen('3000');
            console.log("pueeto abierto", 3000);
        });
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
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("puerto corriendo en ", this.app.get('port'));
        });
    }
}
exports.Server = Server;
const server = new Server();
server.start();
