import { Request, Response } from "express";
import pool from "../database";

class VetController{
    public async listVet(req: Request, res: Response){
        const [list] = await pool.query('SELECT * FROM veterinaria');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }

    public async listVetUnique(req: Request, res: Response){
        const { IdVeterinaria } = req.params;
        const [list] = await pool.query('SELECT * FROM veterinaria WHERE IdVeterinaria = ?', IdVeterinaria);
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const vetController = new VetController();