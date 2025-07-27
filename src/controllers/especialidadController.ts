import { Request, Response } from "express";
import pool from "../database";

class EspecialidadController{
    async listEspecialidad(req: Request, res: Response){
        const list = pool.query('SELECT * FROM ESPECIALIDAD');
        res.json({
            message: 'Todo Ok',
            status: true,
            data: list
        });
    }
}

export const especialidadController = new EspecialidadController(); 