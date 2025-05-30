import { Request, Response } from "express";
import pool from "../database";

class VetController{
    public async listVet(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM VETERINARIA');
        res.json({
            data: list,
            state: true,
            message: 'Todo Correcto'
        });
    }
}

export const vetController = new VetController();