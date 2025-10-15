import { Request, Response } from "express";
import pool from "../database";

class TipoMascotaController{
    public async listTipoMascota(req: Request, res: Response){
        const [list] = await pool.query('SELECT * FROM tipomascota');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const tipoMascotaController = new TipoMascotaController();