import { Request, Response } from "express";
import pool from "../database";

class DoctorFavController{
    async listDoctorFav(req: Request, res: Response){

        const { IdPersona } = req.params;
    
        const [list] = await pool.query(`
            SELECT 
                d.IdDoctor,
                p.Nombres,
                p.Apellidos,
                d.Presentacion,
                p.Foto,
                d.Rating,
    
                COUNT(c.IdComentario) AS TotalComentarios
    
            FROM doctor d
    
            INNER JOIN persona p 
                ON d.IdPersona = p.IdPersona
    
            INNER JOIN favdoc fav 
                ON d.IdDoctor = fav.IdDoctor
    
            LEFT JOIN comentario c 
                ON c.comentable_id = d.IdDoctor
                AND c.comentable_typo = 'doctor'
    
            WHERE fav.IdPersona = ?
    
            GROUP BY d.IdDoctor
    
        `, [IdPersona]);
    
        res.json({
            status: true,
            message: 'Todo correcto',
            data: list
        });
    
    }
}

export const doctorFavController = new DoctorFavController();