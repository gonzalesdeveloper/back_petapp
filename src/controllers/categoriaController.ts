import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

class CategoriaController{
    public async listCategoria(req: Request, res: Response): Promise<any>{
        try{
            const [list] = await pool.query<RowDataPacket[]>('SELECT * FROM categorias');
            successResponse(res, 'Listado Correctamente', list);
        }catch(error){
            console.log('Lista Categorias', error);
            errorResponse(res, 'Error del Servidor');
        }
    }

    public async listCategoriaImportant(req: Request, res: Response): Promise<any>{
        try{
            const [list] = await pool.query('SELECT * FROM categorias WHERE IMPORTANCIA = 1');
            successResponse(res, 'Listado Correctamente', list);
        }catch(error){
            console.log('Listado de Categorias Importantes', error);
            errorResponse(res, 'Error del Servidor');
        }
    }
}

export const categoriaController = new CategoriaController();