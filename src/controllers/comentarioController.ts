import { Request, Response } from "express";
import pool from "../database";

class ComentarioController{
    async getComentarioDoctor(req: Request, res: Response){
        const { IdDoctor } = req.params;
        const list = await pool.query('SELECT * FROM COMENTARIO WHERE comentable_typo = ? AND comentable_id = ?', ['doctor', IdDoctor]);
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
    }

    async createComentarioDoctor(req: Request, res: Response){
        const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;


        await pool.query('INSERT INTO COMENTARIO (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado) VALUES (?,?,?,?,NOW(),?,?,1)', 
        [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]);

        res.json({
            message: 'Creado Correctamente',
            status: true,
        });
    }
}

export const comentarioController = new ComentarioController();