import { Request, Response } from "express";
import pool from "../database";

class AdopcionController{
    async setStateAdoption(req: Request, res: Response) {
        try {
            const { IdPersona, IdAdopcion, MensajeOpcional } = req.body;
            await pool.query(
                `INSERT INTO solicitud_adopcion 
                (IdPersona, IdAdopcion, Fecha_Solicitud, EstadoSolicitud, MensajeOpcional) 
                VALUES (?, ?, NOW(), 'ENVIADA', ?)`,
                [IdPersona, IdAdopcion, MensajeOpcional]
            );
            return res.json({ ok: true, message: "Solicitud enviada correctamente" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, error });
        }
    }
    
}

export const adopcionController = new AdopcionController();