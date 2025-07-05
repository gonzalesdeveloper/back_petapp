import { Request, Response } from "express";
import pool from "../database";
import bcrypt from 'bcrypt';

const saltRounds = 10;

class PersonaController{
    async getPerson (req: Request, res: Response){
        const list = await pool.query("SELECT * FROM PERSONA");
        res.json({
            data: list,
            status: true,
            message: "Todo Correcto"
        });
    }

    async getOnePerson(req: Request, res: Response){
        const { IdPersona } = req.params;        
        const list = await pool.query('SELECT * FROM PERSONA WHERE IDPERSONA = ?' , [IdPersona]);
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
        try {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            }
            await pool.query(
            'UPDATE PERSONA SET ? WHERE IDPERSONA = ?',
            [req.body, IdPersona]
            );
            res.status(201).json({ 
              message: 'Usuario Actualizado',
              /* data: [] */
            });
        } catch (error) {
            res.status(500).json({ 
              error: 'Error al Actualizar Usuario'
            });
        }
    }
}

export const personaController = new PersonaController();