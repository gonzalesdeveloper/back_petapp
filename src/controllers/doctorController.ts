import { Request, Response } from "express";
import pool from "../database";

class DoctorController{
    async getDoctors(req: Request, res: Response){
        const { IdPersona } = req.params;         
        const list = await pool.query('SELECT d.IdDoctor, p.Nombres, p.Apellidos, p.Direccion, p.Foto, d.Rating, CASE WHEN df.IdPersona IS NULL THEN false ELSE true END AS IsFavourite FROM doctor d INNER JOIN persona p ON d.IdPersona = p.IdPersona LEFT JOIN favdoc df ON d.IdDoctor = df.IdDoctor AND df.IdPersona = ?', [IdPersona]);
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
    }
}

export const doctorController = new DoctorController(); 