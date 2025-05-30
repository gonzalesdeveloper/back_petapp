import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

/* rutas */
import petRoutes from './routes/petRoutes';
import personaRoutes from './routes/personaRoutes';
import tipopersonaRoutes from './routes/tipopersonaRoutes';
import tipodocumentoRoutes from './routes/tipodocumentoRoutes';
import razaRoutes from './routes/razaRoutes';
import categoriaRoutes from './routes/categoriaRoutes';
import vetRoutes from './routes/vetRoutes';
import notificacionRoutes from './routes/notificacionRoutes';
import colorRoutes from './routes/colorRoutes';
import tipoMascotaRoutes from './routes/tipoMascotaRoutes';
import eventoRoutes from './routes/eventoRoutes';
import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';

export class Server{
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    async listen(){
        await this.app.listen('3000');
        console.log("pueeto abierto", 3000);
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void{
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/pet', petRoutes);
        this.app.use('/api/person', personaRoutes);
        this.app.use('/api/tipoperson', tipopersonaRoutes);
        this.app.use('/api/tipodocumento', tipodocumentoRoutes);
        this.app.use('/api/raza', razaRoutes);
        this.app.use('/api/categoria', categoriaRoutes);
        this.app.use('/api/vet', vetRoutes);
        this.app.use('/api/noti', notificacionRoutes);
        this.app.use('/api/color', colorRoutes);
        this.app.use('/api/tipomascota', tipoMascotaRoutes);
        this.app.use('/api/evento', eventoRoutes);
        this.app.use('/api/blog', blogRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log("puerto corriendo en " , this.app.get('port'));            
        });
    }
}

const server = new Server();
server.start();