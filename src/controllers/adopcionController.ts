import { Request, Response } from "express";
import pool from "../database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class AdopcionController{
    async setStateAdoption(req: Request, res: Response): Promise<any>  {
      const { IdPersona, IdMascotaAdopcion, Mensaje } = req.body;
      const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();
          console.log();

          const [existe]: any = await conn.query(`
            SELECT 1 
            FROM solicitud_adopcion 
            WHERE IdPersona = ? AND IdMascotaAdopcion = ?
          `,[IdPersona, IdMascotaAdopcion]);
          
          if(existe.length > 0){
            throw new Error("Ya existe una solicitud para esta mascota");
          }

          const [result] = await pool.query<ResultSetHeader>(
              `INSERT INTO solicitud_adopcion 
              (IdPersona, IdMascotaAdopcion, Fecha_Solicitud, Estado_Solicitud, Mensaje) 
              VALUES (?, ?, NOW(), 'Pendiente', ?)`,
              [IdPersona, IdMascotaAdopcion, Mensaje]
          );
          const IdSolicitud = result.insertId;
          // 2 insertar historial
          await conn.query(`
            INSERT INTO adopcion_historial
            (IdSolicitud, EstadoAnterior, EstadoNuevo, FechaCambio)
            VALUES (?, NULL, 'Pendiente', NOW())
        `,[IdSolicitud]);

          await conn.commit();

          return res.json({ ok: true, message: "Solicitud enviada correctamente" });
        } catch (error) {
            return res.status(500).json({ ok: false, error });
        } finally{
          conn.release();
        }
    }

    async listAdoption(req: Request, res: Response){
        const { IdPersona } = req.params;
        const [ list ] = await pool.query(`SELECT sa.IdSolicitud, sa.Estado_Solicitud, sa.Fecha_Solicitud, p.Nombre, tm.Descripcion AS Tipo, r.Descripcion AS Raza, c.Descripcion AS Color, p.Foto 
        FROM solicitud_adopcion sa
        INNER JOIN mascota_adopcion ma 
          ON sa.IdMascotaAdopcion = ma.IdMascotaAdopcion
        INNER JOIN pet p
          ON ma.IdPet = p.IdPet
        INNER JOIN tipomascota tm
          ON p.IdTipoMascota = tm.IdTipoMascota
        INNER JOIN raza r
          ON p.IdRaza = r.IdRaza
        INNER JOIN color c
          ON p.IdColor = c.IdColor
        WHERE sa.IdPersona = ?
        ORDER BY sa.Fecha_Solicitud DESC;`,  [IdPersona]);

        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        });
    }
    


    async actualizarEstadoSolicitud(req: Request, res: Response){

      const { IdSolicitud, EstadoNuevo } = req.body;
    
      const conn = await pool.getConnection();
    
      try{
    
        await conn.beginTransaction();
    
        // 1. obtener estado actual
        const [rows] = await conn.query<RowDataPacket[]>(`
          SELECT Estado, IdMascotaAdopcion, IdPersona
          FROM solicitud_adopcion
          WHERE IdSolicitud = ?
        `,[IdSolicitud]);
    
        const solicitud = rows[0];
    
        const estadoAnterior = solicitud.Estado;
    
        // 2. actualizar estado
        await conn.query<ResultSetHeader>(`
          UPDATE solicitud_adopcion
          SET Estado = ?
          WHERE IdSolicitud = ?
        `,[EstadoNuevo, IdSolicitud]);
    
        // 3. guardar historial
        await conn.query(`
          INSERT INTO adopcion_historial
          (IdSolicitud, EstadoAnterior, EstadoNuevo, FechaCambio)
          VALUES (?, ?, ?, NOW())
        `,[IdSolicitud, estadoAnterior, EstadoNuevo]);
    
        await conn.commit();
    
        res.json({ ok:true });
    
      }catch(error){
    
        await conn.rollback();
        res.status(500).json(error);
    
      }finally{
    
        conn.release();
    
      }
    
    }
}

export const adopcionController = new AdopcionController();