import { Request, Response } from "express";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

class DoctorFavController{
    async listDoctorFav(req: Request, res: Response):Promise<any>{
        const { IdPersona } = req.params;
        try{
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
        
            return successResponse(res, 'Listado Correctamente', list);
        }catch(error){
            console.log('Error al listar doctores favoritos', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }
}

export const doctorFavController = new DoctorFavController();