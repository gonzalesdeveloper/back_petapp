import { Request, Response } from "express";
import pool from "../database";

class PetFavController{
    async getFavPet(req: Request, res: Response){
        const { IdPersona } = req.params;
        const [list] = await pool.query('SELECT m.IdPet, m.Nombre, m.Apellidos, m.Tipo, m.Edad, m.Peso, m.Foto, f.Fecha FROM favpet f INNER JOIN pet m ON f.IdPet = m.IdPet WHERE f.IdPersona = ? ORDER BY m.Tipo, f.Fecha DESC', [IdPersona]);
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        });
    }

    /* pet fav */
    async petFav(req: Request, res: Response): Promise<any> {
        const { IdPersona, IdPet } = req.body;
    
        if (!IdPersona || !IdPet) {
            return res.status(400).json({
                status: false,
                message: 'Se requiere IdPersona e IdMascota'
            });
        }
    
        try {
            const [rows]: any = await pool.query(
                'SELECT * FROM favpet WHERE IdPersona = ? AND IdPet = ?',
                [IdPersona, IdPet]
            );
    
            if (rows.length > 0) {
                await pool.query(
                    'DELETE FROM favpet WHERE IdPersona = ? AND IdPet = ?',
                    [IdPersona, IdPet]
                );
    
                return res.json({
                    status: true,
                    favorite: false,
                    message: 'Eliminado de favoritos'
                });
    
            } else {
                await pool.query(
                    'INSERT INTO favpet (IdPersona, IdPet) VALUES (?, ?)',
                    [IdPersona, IdPet]
                );
    
                return res.json({
                    status: true,
                    favorite: true,
                    message: 'Marcado como favorito'
                });
            }
    
        } catch (error: any) {
            console.error('Error en mascotaFavorita:', error);
            return res.status(500).json({
                status: false,
                message: 'Error en el servidor',
                error: error.message
            });
        }
    }
    
}

export const petFavController = new PetFavController();