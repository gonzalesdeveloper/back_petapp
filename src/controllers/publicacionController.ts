import { Request, Response } from "express";
import pool from "../database";

class PublicacionController{
    async newPublicacion(req: Request, res: Response): Promise<any>{
        try {
            const { IdPersona, IdPet, TipoPublicacion, Nombre_Contacto, Telefono_Contacto } = req.body;
    
            if (!IdPersona || !IdPet || !TipoPublicacion) {
                return res.status(400).json({
                    status: false,
                    message: 'Datos incompletos'
                });
            }
    
            const [result]: any = await pool.query(`
                INSERT INTO publicacion 
                (IdPersona, IdPet, TipoPublicacion, Estado, Nombre_Contacto, Telefono_Contacto)
                VALUES (?, ?, ?, 'pendiente', ?, ?)
            `, [IdPersona, IdPet, TipoPublicacion, Nombre_Contacto, Telefono_Contacto]);
    
            res.json({
                status: true,
                message: 'Registro Guardado Correctamente',
                IdPublicacion: result.insertId
            });
    
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error en el servidor'
            });
        }
    }

    async listPubliAprobadas(req: Request, res: Response){
        const [list] = await pool.query(`
            SELECT 
                p.*,
                m.Nombre,
                m.Tipo,
                m.Edad,
    
                ma.Estado AS EstadoAdopcion,
                ma.Vacunas_Completas,
                ma.Castrado,
    
                mp.Lugar_Perdida,
                mp.Fecha_Perdida
    
            FROM publicacion p
            INNER JOIN pet m ON m.IdPet = p.IdPet
    
            LEFT JOIN mascota_adopcion ma ON ma.IdPet = m.IdPet
            LEFT JOIN mascota_perdida mp ON mp.IdPet = m.IdPet
    
            WHERE p.Estado = 'aprobado'
        `);
    
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        });
    }

    async AprobarPublicacion(req: Request, res: Response): Promise<any>{
        const { IdPublicacion } = req.params;

        if (!IdPublicacion) {
            return res.status(400).json({
                status: false,
                message: 'Id requerido'
            });
        }

        await pool.query(`UPDATE publicacion
        SET Estado = 'aprobado',
            Fecha_Aprobacion = CURRENT_TIMESTAMP
        WHERE IdPublicacion = ?
        `, [IdPublicacion]);

        res.json({
            status: true,
            message: 'Aprobado Correctamente'
        });
    }

    async RechazarPublicacion(req: Request, res: Response):Promise<any>{
        const { IdPublicacion } = req.params;

        if (!IdPublicacion) {
            return res.status(400).json({
                status: false,
                message: 'Id requerido'
            });
        }

        await pool.query(`UPDATE publicacion
        SET Estado = 'rechazado',
            Fecha_Rechazo = CURRENT_TIMESTAMP
        WHERE IdPublicacion = ?
        `, [IdPublicacion]);

        res.json({
            status: true,
            message: 'Rechazado Correctamente'
        });
    }


    /* para listar en un dashboard angular */
    async listPendientes(req: Request, res: Response){
        const [list] = await pool.query(`
            SELECT 
                p.*,
                m.Nombre,
                m.Tipo
            FROM publicacion p
            INNER JOIN pet m ON m.IdPet = p.IdPet
            WHERE p.Estado = 'pendiente'
            ORDER BY p.Fecha_Creacion DESC
        `);
    
        res.json({
            status: true,
            data: list
        });
    }
}

export const publicacionController = new PublicacionController();