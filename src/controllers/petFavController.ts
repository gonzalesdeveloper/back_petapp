import { Request, Response } from "express";
import pool from "../database";

class PetFavController{
    async getFavPet(req: Request, res: Response){
        const { IdPersona } = req.params;
        const list = await pool.query('SELECT m.IdPet, m.Nombre, m.Tipo, m.Edad, m.Peso, m.Foto, f.Fecha FROM favpet f INNER JOIN Pet m ON f.IdPet = m.IdPet WHERE f.IdPersona = ? ORDER BY m.Tipo, f.Fecha DESC', [IdPersona]);
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        });
    }
}

export const petFavController = new PetFavController();