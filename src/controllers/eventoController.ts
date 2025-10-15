import { Request, Response } from "express";
import pool from "../database";

class EventoController{
    public async listEvento(req: Request, res: Response){
        const [list] = await pool.query('SELECT * FROM evento');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const eventoController = new EventoController();