import { Request, Response } from "express";
import pool from "../database";

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
        res.json({
            data: list,
            status: true,
            message: 'Todo correcto'
        })
    }
}

export const personaController = new PersonaController();