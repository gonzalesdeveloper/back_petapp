import { Request, Response } from "express";
import pool from "../database";
import bcrypt from 'bcrypt';

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
        
        try {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            }
            const fecha = new Date(req.body.Nacimiento);
            const fechaFormateada = fecha.toISOString().split('T')[0];
            req.body.Nacimiento = fechaFormateada;
            
            await pool.query(
            'UPDATE persona SET ? WHERE IdPersona = ?',
            [req.body, IdPersona]
            );
            res.status(201).json({ 
              message: 'Usuario Actualizado',
              /* data: [] */
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