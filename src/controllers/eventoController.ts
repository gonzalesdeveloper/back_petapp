import { Request, Response } from "express";
import pool from "../database";

class EventoController{
    public async listEvento(req: Request, res: Response): Promise<any> {
      const { IdPersona } = req.params;
        try {
          // 1️⃣ Obtener todos los eventos
          const [eventos]: any = await pool.query('SELECT * FROM evento');
      
          if (!eventos.length) {
            return res.json({
              data: [],
              status: true,
              message: 'No hay eventos registrados'
            });
          }
      
          // 2️⃣ Obtener todos los asistentes
          const [asistentes]: any = await pool.query(`
            SELECT ea.IdEvento, p.IdPersona, p.Nombres, p.Foto
            FROM evento_asistencia ea
            INNER JOIN persona p ON ea.IdPersona = p.IdPersona
            WHERE ea.Estado = 'asistir'
          `);
      
          // 3️⃣ Asociar asistentes a sus eventos
          const data = eventos.map((evento: any) => {
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
          res.json({
            data,
            status: true,
            message: 'Eventos y asistentes obtenidos correctamente'
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            status: false,
            message: 'Error al listar eventos con asistentes',
            error
          });
        }
      }
      
      public async setAsistent(req: Request, res: Response): Promise<any>{
        const { IdEvento, IdPersona } = req.body;

        try {
            // Verificar si ya existe
            const [existe]: any = await pool.query(
            'SELECT * FROM evento_asistencia WHERE IdEvento = ? AND IdPersona = ?',
            [IdEvento, IdPersona]
            );

            if (existe.length > 0) {
            // Si existe, eliminar (cancelar asistencia)
            await pool.query(
                'DELETE FROM evento_asistencia WHERE IdEvento = ? AND IdPersona = ?',
                [IdEvento, IdPersona]
            );
            return res.json({ message: 'Asistencia cancelada', asistiendo: false });
            } else {
            // Si no existe, insertar (asistir)
            await pool.query(
                'INSERT INTO evento_asistencia (IdEvento, IdPersona) VALUES (?, ?)',
                [IdEvento, IdPersona]
            );
            return res.json({ message: 'Asistencia registrada', asistiendo: true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar asistencia' });
        }
    }
}

export const eventoController = new EventoController();