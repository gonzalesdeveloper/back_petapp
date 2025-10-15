import e, { Request, Response } from "express";
import pool from "../database";

class ColorController{
    public async listColor(req: Request, res: Response){
        const [list] = await pool.query('SELECT * FROM color');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}
export const colorController = new ColorController();