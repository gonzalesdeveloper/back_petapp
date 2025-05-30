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

    async getTypePerson(req: Request, res: Response){
        const { id } = req.params; 
        console.log(id)
        const list = await pool.query('SELECT * FROM PERSONA WHERE IDTIPOPERSONA = ?' , [id]);
        res.json({
            data: list,
            status: true,
            message: 'Todo correcto'
        })
    }
}

export const personaController = new PersonaController();