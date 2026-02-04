import { Request, Response } from "express";
import pool from "../database";

class FundacionController{
    public async getFundations(req: Request, res: Response){
        const [list] = await pool.query('SELECT * FROM fundacion');
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        })
    }
}

export const fundacionController = new FundacionController;