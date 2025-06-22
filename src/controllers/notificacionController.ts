import { Request, Response } from "express";
import pool from "../database";

class NotificacionController{
    public async listNotificacion(req: Request, res: Response){
        const { IdPersona } = req.params;
        const list = await pool.query('SELECT * FROM NOTIFICACION WHERE IDPERSONA = ?', [IdPersona]);
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const notificacionController = new NotificacionController();