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
}

export const comentarioController = new ComentarioController();