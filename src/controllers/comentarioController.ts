import { Request, Response } from "express";
import pool from "../database";

class ComentarioController{
    /* COMENTARIOS HACIA EL DOCTOR */
    async getComentarioDoctor(req: Request, res: Response){
        const { IdDoctor } = req.params;
        const [list] = await pool.query('SELECT c.IdComentario, c.IdPersona, p.Foto, c.Titulo, c.Descripcion, c.Rating, c.Fecha, c.comentable_id, c.comentable_typo, c.Estado FROM comentario c INNER JOIN persona p ON c.IdPersona = p.IdPersona WHERE comentable_typo = ? AND comentable_id = ?', ['doctor', IdDoctor]);
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
    }

    async createComentarioDoctor(req: Request, res: Response){
        const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;


        await pool.query('INSERT INTO comentario (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado) VALUES (?,?,?,?,NOW(),?,?,1)', 
        [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]);

        res.json({
            message: 'Creado Correctamente',
            status: true,
        });
    }

    /* COMENTARIOS HACIA LA VETERINARIA */
    async getComentarioVet(req: Request, res: Response){
        const { IdVeterinaria } = req.params;
        const [list] = await pool.query('SELECT c.IdComentario, c.IdPersona, p.Nombres, p.Apellidos, p.Foto, c.Titulo, c.Descripcion, c.Rating, c.Fecha, c.comentable_id, c.comentable_typo, c.Estado FROM comentario c INNER JOIN persona p ON c.IdPersona = p.IdPersona WHERE comentable_typo = ? AND comentable_id = ?', ['veterinaria', IdVeterinaria]);
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
    }
}

export const comentarioController = new ComentarioController();