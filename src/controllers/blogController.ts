import { Request, Response } from "express";
import pool from "../database";

class BlogController{
    public async listBlog(req: Request, res: Response){
        const [list] = await pool.query('SELECT * FROM blog');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }

    public async getBlogOne(req: Request, res: Response){
        const { IdBlog } = req.params;
        const [list] : any = await pool.query('SELECT * FROM BLOG WHERE IdBlog = ?', [IdBlog]);
        const [Fotos]: any = await pool.query('SELECT * FROM blog_foto WHERE IdBlog = ?', [IdBlog]);
        const data = [{ ...list[0], Fotos }]
        res.json({
            data,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const blogController = new BlogController();