import { Request, Response } from "express";
import pool from "../database";


class RazaController{

    public async listRaza(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM RAZA');
        res.json({
            data: list,
            state: true,
            message: 'Todo Correcto'
        });
    }
}

export const razaController = new RazaController();