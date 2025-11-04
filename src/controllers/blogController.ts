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
        const [list] = await pool.query('SELECT * FROM BLOG WHERE IdBlog = ?', [IdBlog]);
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const blogController = new BlogController();