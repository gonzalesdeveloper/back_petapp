import { json, Request, Response } from "express";
import pool from "../database";

class DoctorController{
    async getDoctorsHome(req: Request, res: Response){
        const { IdPersona } = req.params;         
        const [list] = await pool.query('SELECT d.IdDoctor, p.Nombres, p.Apellidos, p.Direccion, p.Referencia, p.Foto, d.Presentacion, d.Rating, CASE WHEN df.IdPersona IS NULL THEN false ELSE true END AS IsFavourite FROM doctor d INNER JOIN persona p ON d.IdPersona = p.IdPersona LEFT JOIN favdoc df ON d.IdDoctor = df.IdDoctor AND df.IdPersona = ?', [IdPersona]);
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
    }

    async getDetailDoctor(req: Request, res: Response){
        const { IdDoctor } = req.params;
        const [list] = await pool.query('SELECT p.IdPersona, d.IdDoctor, p.Nombres, p.Apellidos, p.Direccion, p.Foto, p.Referencia, d.Rating, d.Presentacion FROM `persona` p inner join doctor d on p.IdPersona = d.IdPersona WHERE d.IdDoctor = ?', [IdDoctor]);
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
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