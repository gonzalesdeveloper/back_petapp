import { Request, Response } from "express";
import pool from "../database";

class DoctorFavController{
    async listDoctorFav(req: Request, res: Response){
        const { IdPersona } = req.params;
        const list = await pool.query('SELECT d.IdDoctor, p.Nombres, p.Apellidos, d.Presentacion, p.Foto, d.Rating from Doctor d INNER JOIN Persona p ON d.IdPersona = p.IdPersona INNER JOIN  favdoc fav ON d.IdDoctor = fav.IdDoctor WHERE fav.IdPersona = ?', [IdPersona]);
        res.json({
            status: true,
            message: 'Todo correcto',
            data: list
        })
    }
}

export const doctorFavController = new DoctorFavController();