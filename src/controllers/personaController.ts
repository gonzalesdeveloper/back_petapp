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
        console.log(req.body);
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

            if (requiereToken) {
                // Obtener persona actualizada
                const [rows]: any = await pool.query(
                  'SELECT IdPersona, Email, Nombres, Apellidos FROM persona WHERE IdPersona = ?',
                  [IdPersona]
                );
          
                const persona = rows[0];
          
                const payload = {
                  IdPersona: persona.IdPersona,
                  Email: persona.Email,
                  Nombres: persona.Nombres,
                  Apellidos: persona.Apellidos
                };
          
                accessToken = generateAccessToken(payload);
                refreshToken = generateRefreshToken(payload);
              }

            res.status(201).json({ 
              status: true,
              message: 'Usuario Actualizado',
              accessToken,
              refreshToken
            });
        } catch (error) {
            console.log(error);
            
            res.status(500).json({ 
              error: 'Error al Actualizar Usuario'
            });
        }
    }
}

export const personaController = new PersonaController();