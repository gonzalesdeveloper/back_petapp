import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

class BlogController{
    public async listBlog(req: Request, res: Response): Promise<any>{
        try{
            const [list] = await pool.query('SELECT * FROM blog');
            return successResponse(res, 'Listado Correctamente', list);
        }catch(error){
            console.log('Error Listar Blogs', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }

    public async getBlogOne(req: Request, res: Response): Promise<any>{
        try{
            const { IdBlog } = req.params;
            const [list] = await pool.query<RowDataPacket[]>('SELECT * FROM blog WHERE IdBlog = ?', [IdBlog]);
            if (list.length === 0) {
                return errorResponse(res, 'Blog no encontrado', 404);
            }
            const [Fotos] = await pool.query<RowDataPacket[]>('SELECT * FROM blog_foto WHERE IdBlog = ?', [IdBlog]);
            const data = [{ ...list[0], Fotos }]
            return successResponse(res, 'Listado Correctamente', data);
        }catch(error){
            console.log('Error al obtener el blog', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }
}

export const blogController = new BlogController();