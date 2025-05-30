import { Request, Response } from "express";
import pool from "../database";

class CategoriaController{
    public async listCategoria(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM CATEGORIAS');
        res.json({
            data: list,
            state: true,
            message: 'Todo Correcto'
        })
    }
}

export const categoriaController = new CategoriaController();