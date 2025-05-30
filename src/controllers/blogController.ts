import { Request, Response } from "express";
import pool from "../database";

class BlogController{
    public async listBlog(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM BLOG');
        res.json({
            data: list,
            status: true,
            message: 'Todo Correcto'
        });
    }
}

export const blogController = new BlogController();