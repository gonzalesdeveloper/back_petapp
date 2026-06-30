import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

class EventoController{
    public async listEvento(req: Request, res: Response): Promise<any> {
      const { IdPersona } = req.params;
        try {
          // 1️⃣ Obtener todos los eventos
          const [eventos] = await pool.query<RowDataPacket[]>('SELECT * FROM evento');
      
          // 2️⃣ Obtener todos los asistentes
          const [asistentes] = await pool.query<RowDataPacket[]>(`
            SELECT ea.IdEvento, p.IdPersona, p.Nombres, p.Foto
            FROM evento_asistencia ea
            INNER JOIN persona p ON ea.IdPersona = p.IdPersona
            WHERE ea.Estado = 'asistir'
          `);
      
          // 3️⃣ Asociar asistentes a sus eventos
          const data = eventos.map( evento => {
            const personas = asistentes.filter((a: any) => a.IdEvento === evento.IdEvento);
            const asistire = personas.some((a: any) => a.IdPersona == IdPersona);
            return {
              ...evento,
              Asistentes: personas.slice(0, 3), // 🔹 muestra los primeros 3
              TotalAsistentes: personas.length,
              Asisitire: asistire
            };
          });
      
          // 4️⃣ Devolver todo en una sola respuesta
          return successResponse(res, 'Listado Correctamente', data);
        } catch (error) {
          console.error('Error al obtener listado de eventos', error);
          return errorResponse(res, 'Error del Servidor');
        }
      }
      
      public async setAsistent(req: Request, res: Response): Promise<any>{
        const { IdEvento, IdPersona } = req.body;

        try {
            // Verificar si ya existe
            const [existe] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM evento_asistencia WHERE IdEvento = ? AND IdPersona = ?',
            [IdEvento, IdPersona]
            );

            if (existe.length > 0) {
            // Si existe, eliminar (cancelar asistencia)
            await pool.query(
                'DELETE FROM evento_asistencia WHERE IdEvento = ? AND IdPersona = ?',
                [IdEvento, IdPersona]
            );
            return successResponse(res, 'Asistencia Cancelada', { asistiendo: false } );
            } else {
            // Si no existe, insertar (asistir)
            await pool.query(
                'INSERT INTO evento_asistencia (IdEvento, IdPersona) VALUES (?, ?)',
                [IdEvento, IdPersona]
            );
            return successResponse(res, 'Asistencia Registrada', { asistiendo: true })
            }
        } catch (error) {
            console.error('Error al registrar o cancelar asistencia' , error);
            return errorResponse(res, 'Error del Servidor');
        }
    }
}

export const eventoController = new EventoController();