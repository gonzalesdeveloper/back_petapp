import { Request, Response } from "express";
import pool from "../database";

class BannerController{
    public async getListBanners(req: Request, res: Response){
        const [ list ] = await pool.query('SELECT * FROM banner WHERE Estado = 1 AND NOW() BETWEEN FechaInicio AND FechaFin ORDER BY OrdenMostrar ASC LIMIT 5;');
        res.json({
            status: true,
            message: 'Todo Ok',
            data : list
        })
    }
}

export const bannerController = new BannerController();