import { Request, Response } from "express";
import pool from "../database";

class ComentarioController{
    /* COMENTARIOS HACIA EL DOCTOR */
    async getComentarioDoctor(req: Request, res: Response){
        const { IdDoctor } = req.params;
        const [list] = await pool.query('SELECT c.IdComentario, c.IdPersona, p.Nombres, p.Apellidos, p.Foto, c.Titulo, c.Descripcion, c.Rating, c.Fecha, c.comentable_id, c.comentable_typo, c.Estado FROM comentario c INNER JOIN persona p ON c.IdPersona = p.IdPersona WHERE comentable_typo = ? AND comentable_id = ?', ['doctor', IdDoctor]);
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
    }

    /* async createComentarioDoctor(req: Request, res: Response){
        const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;


        await pool.query('INSERT INTO comentario (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado) VALUES (?,?,?,?,NOW(),?,?,1)', 
        [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]);

        res.json({
            message: 'Creado Correctamente',
            status: true,
        });
    } */

    async createComentario(req: Request, res: Response): Promise<any>{
        try {
            const { IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo } = req.body;
    
            // 🔒 Validaciones básicas
            if (!IdPersona || !Descripcion || !Rating || !comentable_id || !comentable_typo) {
                return res.status(400).json({
                    status: false,
                    message: 'Datos incompletos'
                });
            }
    
            // 🔒 Tipos válidos
            const tablasValidas: any = {
                doctor: { tabla: 'doctor', id: 'IdDoctor' },
                veterinaria: { tabla: 'veterinaria', id: 'IdVeterinaria' },
                fundacion: { tabla: 'fundacion', id: 'IdFundacion' }
            };
    
            const config = tablasValidas[comentable_typo];
    
            if (!config) {
                return res.status(400).json({
                    status: false,
                    message: 'Tipo inválido'
                });
            }
    
            // ✅ 1. Insertar comentario
            await pool.query(
                `INSERT INTO comentario 
                (IdPersona, Titulo, Descripcion, Rating, Fecha, comentable_id, comentable_typo, Estado) 
                VALUES (?,?,?,?,NOW(),?,?,1)`,
                [IdPersona, Titulo, Descripcion, Rating, comentable_id, comentable_typo]
            );
    
            // ✅ 2. Calcular promedio
            const [rows]: any = await pool.query(
                `SELECT ROUND(AVG(Rating), 1) as promedio 
                 FROM comentario 
                 WHERE comentable_typo = ? 
                   AND comentable_id = ?`,
                [comentable_typo, comentable_id]
            );
    
            const promedio = rows[0].promedio || 0;
    
            // ✅ 3. Actualizar tabla correspondiente
            await pool.query(
                `UPDATE ${config.tabla} 
                 SET Rating = ? 
                 WHERE ${config.id} = ?`,
                [promedio, comentable_id]
            );
    
            res.json({
                message: 'Creado Correctamente',
                status: true,
                promedio
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: 'Error en el servidor'
            });
        }
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

    /* COMENTARIOS HACIA LA FUNDACION */
async getComentarioFundacion(req: Request, res: Response){
    const { IdFundacion } = req.params;

    const [list] = await pool.query(
        `SELECT 
            c.IdComentario, 
            c.IdPersona, 
            p.Nombres, 
            p.Apellidos, 
            p.Foto, 
            c.Titulo, 
            c.Descripcion, 
            c.Rating, 
            c.Fecha, 
            c.comentable_id, 
            c.comentable_typo, 
            c.Estado 
        FROM comentario c 
        INNER JOIN persona p ON c.IdPersona = p.IdPersona 
        WHERE c.comentable_typo = ? 
          AND c.comentable_id = ?`,
        ['fundacion', IdFundacion]
    );

    res.json({
        message: 'Todo Correcto',
        status: true,
        data: list
    });
}

}

export const comentarioController = new ComentarioController();