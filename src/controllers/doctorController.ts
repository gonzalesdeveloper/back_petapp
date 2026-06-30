import { json, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

class DoctorController{
    async getDoctorsHome(req: Request, res: Response): Promise<any>{
        const { IdPersona } = req.params;
        try{
            const [list] = await pool.query<RowDataPacket[]>(`
                SELECT 
                    d.IdDoctor,
                    p.Nombres,
                    p.Apellidos,
                    p.Direccion,
                    p.Referencia,
                    p.Foto,
                    d.Presentacion,
                    d.Rating,
        
                    COUNT(c.IdComentario) AS TotalComentarios,
        
                    CASE 
                        WHEN df.IdPersona IS NULL THEN false 
                        ELSE true 
                    END AS IsFavourite
        
                FROM doctor d
        
                INNER JOIN persona p 
                    ON d.IdPersona = p.IdPersona
        
                LEFT JOIN favdoc df 
                    ON d.IdDoctor = df.IdDoctor 
                    AND df.IdPersona = ?
        
                LEFT JOIN comentario c
                    ON d.IdDoctor = c.comentable_id
                    AND c.comentable_typo = 'doctor'
        
                GROUP BY d.IdDoctor
        
            `, [IdPersona]);
        
            return successResponse(res, 'Listado Correctamente', list);
        }catch(error){
            console.log('Lista Doctores', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }
    async getDetailDoctor(req: Request, res: Response): Promise<any>{
        const { IdDoctor } = req.params;
        try{
            const [list] = await pool.query<RowDataPacket[]>('SELECT p.IdPersona, d.IdDoctor, p.Nombres, p.Apellidos, p.Direccion, p.Foto, p.Referencia, d.Rating, d.Presentacion FROM `persona` p inner join doctor d on p.IdPersona = d.IdPersona WHERE d.IdDoctor = ?', [IdDoctor]);
            if ( list.length === 0) return errorResponse(res, 'No se encontró el registro', 404);
            return successResponse(res, 'Registro Encontrado', list);
        }catch(error){
            console.log('One Doctor Detail', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }

    async doctorFavorito(req: Request, res: Response): Promise<any> {
        const { IdPersona, IdDoctor } = req.body;
        if( !IdPersona || !IdDoctor){
            return res.status(400).json({ status: false, message: 'Se requiere los IDs correspondientes'});
        }
        try{
            const [rows]: any = await pool.query('SELECT * FROM favdoc where IdPersona = ? and IdDoctor = ?', [IdPersona, IdDoctor]);
            if ( rows.length > 0){
                await pool.query('DELETE FROM favdoc where IdPersona = ? and IdDoctor = ?', [IdPersona, IdDoctor]);
                return res.json({
                    message: 'Elimado Correctamente',
                    status: true
                })
            }else{
                await pool.query('INSERT INTO favdoc (IdPersona, IdDoctor) values (?,?)', [IdPersona, IdDoctor]);
                return res.json({
                    message: 'Marcado Favorito',
                    status: true
                })
            }
        }catch(error: any){
            console.error('Error en doctorFavorito:', error);
            return res.status(500).json({
                status: false,
                message: 'Error en el servidor',
                error: error.message, // 🟧 Añade mensaje para depurar
            });
        }
    }
}

export const doctorController = new DoctorController(); 