import { Request, Response } from "express";
import pool from "../database";

class NotificacionController{
    public async listNotificacion(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM NOTIFICACION');
        res.json({
            data: list,
            state: true,
            message: 'Todo Correcto'
        })
    }
}

export const notificacionController = new NotificacionController();