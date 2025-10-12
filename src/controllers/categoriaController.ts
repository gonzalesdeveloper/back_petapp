import { Request, Response } from "express";
import pool from "../database";

class CategoriaController{
    public async listCategoria(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM CATEGORIAS');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        })
    }

    public async listCategoriaImportant(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM CATEGORIAS WHERE IMPORTANCIA = 1');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        })
    }
}

export const categoriaController = new CategoriaController();