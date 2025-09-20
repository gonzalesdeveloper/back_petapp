import { Request, Response } from "express";
import pool from "../database";

class DoctorFavController{
    async listDoctorFav(req: Request, res: Response){
        const { IdDoctor } = req.params;
        const list = await pool.query('SELECT d.IdDoctor, d.Presentacion, d.Foto, d.Rating from Doctor d INNER JOIN favdoc fav ON d.IdDoctor = fav.IdDoctor INNER JOIN Persona p ON fav.IdPersona = p.IdPersona WHERE d.IdDoctor = ?', [IdDoctor]);
        res.json({
            status: true,
            message: 'Todo correcto',
            data: list
        })
    }
}

export const doctorFavController = new DoctorFavController();