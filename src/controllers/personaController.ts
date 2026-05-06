import { Request, Response } from "express";
import pool from "../database";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";

const saltRounds = 10;

class PersonaController{
    async getPerson (req: Request, res: Response){
        const [list] = await pool.query("SELECT * FROM persona");
        res.json({
            data: list,
            status: true,
            message: "Todo Correcto"
        });
    }

    async getOnePerson(req: Request, res: Response){
        const { IdPersona } = req.params;        
        const [list] : any = await pool.query('SELECT * FROM persona WHERE IdPersona = ?' , [IdPersona]);

        list[0].Password = '';
        const fecha = new Date(list[0].Nacimiento);
        const fechaFormateada = fecha.toISOString().split('T')[0];
        list[0].Nacimiento = fechaFormateada;
        
        res.json({
            data: list,
            status: true,
            message: 'Todo correcto'
        })
    }

    /* editar persona */
    public async editPerson(req: Request, res: Response){
        const { IdPersona} = req.params;
        const data = req.body;
        
        try {
            if (data.Password) {
                data.Password = await bcrypt.hash(data.Password, saltRounds);
            }else{ delete( data.Password) }

            if (data.Nacimiento){
                const fecha = new Date(data.Nacimiento);
                const fechaFormateada = fecha.toISOString().split('T')[0];
                data.Nacimiento = fechaFormateada;
            }else{ delete(data.Nacimiento) }
            
            await pool.query(
            'UPDATE persona SET ? WHERE IdPersona = ?', [data, IdPersona]
            );

            // Ver si requiere regenerar token 🔐
            const camposToken = ['Email', 'Nombres', 'Apellidos'];
            const requiereToken = camposToken.some(campo => campo in data);

            let accessToken: string | null = null;
            let refreshToken: string | null = null;
            let userLog: any = null;

            if (requiereToken) {
                // Obtener persona actualizada
                const [rows]: any = await pool.query(
                  'SELECT IdPersona, Email, Nombres, Apellidos, Foto FROM persona WHERE IdPersona = ?',
                  [IdPersona]
                );
          
                const persona = rows[0];
          
                const payload = {
                  IdPersona: persona.IdPersona,
                  Email: persona.Email,
                };

                userLog = { IdPersona: persona.IdPersona, Email: persona.Email, Nombres: persona.Nombres, Apellidos: persona.Apellidos, Foto: persona.Foto }
          
                accessToken = generateAccessToken(payload);
                refreshToken = generateRefreshToken(payload);
              }

            res.status(201).json({ 
              status: true,
              message: 'Usuario Actualizado',
              accessToken,
              refreshToken,
              userLog
            });
        } catch (error) {
            console.log(error);
            
            res.status(500).json({ 
              error: 'Error al Actualizar Usuario'
            });
        }
    }

    /* EDIT PHOTO */
    public async editPhoto(req: any, res: Response) {
        try {
            const IdPersona = req.user.IdPersona; // o desde token (mejor)
      
          if (!req.file) {
            return res.status(400).json({ error: 'No se envió imagen' });
          }
      
          const filePath = req.file.path; // 🔥 AQUÍ está la ruta real
      
          await pool.query(
            'UPDATE persona SET Foto = ? WHERE IdPersona = ?',
            [filePath, IdPersona]
          );
      
          res.json({
            message: 'Foto actualizada',
            foto: filePath
          });
      
        } catch (error) {
          res.status(500).json({ error: 'Error al subir foto' });
        }
      }
}

export const personaController = new PersonaController();