import { Request, Response } from "express";
import pool from "../database";

class NotificacionController{
    public async listNotificacion(req: Request, res: Response){
        const { IdPersona } = req.params;
        const [list] = await pool.query('SELECT n.IdNotificacion, n.IdPersona, n.IdTipoNoficacion, n.Titulo, n.Descripcion, tn.Icono, n.Estado FROM notificacion n INNER JOIN tipo_notificacion tn ON n.IdTipoNoficacion = tn.IdTipoNoficacion WHERE IdPersona = ?', [IdPersona]);
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const notificacionController = new NotificacionController();