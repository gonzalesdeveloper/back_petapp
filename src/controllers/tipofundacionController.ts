import { Request, Response } from "express";
import pool from "../database";

class TipoFundacionController{
    public async getTipo(req: Request, res: Response){
        const [list] = await pool.query('SELECT * FROM tipofundacion');
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        })
    }
}

export const tipoFundacionController = new TipoFundacionController()