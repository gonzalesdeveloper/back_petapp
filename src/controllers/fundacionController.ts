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

    public async getFundationsSelect(req: Request, res: Response){
        const [list] = await pool.query(`
            SELECT DISTINCT 
                f.IdFundacion, 
                f.Nombre 
            FROM fundacion f
            INNER JOIN donacionfundacion df 
                ON df.IdFundacion = f.IdFundacion
        `);
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        })
    }


    public async getOneFundation(req: Request, res: Response){
        try {
            const { IdFundacion } = req.params;
    
            const [fundacionRows]: any = await pool.query(
                'SELECT * FROM fundacion WHERE IdFundacion = ?',
                [IdFundacion]
            );
    
            if (fundacionRows.length === 0) {
                res.status(404).json({
                    status: false,
                    message: 'Fundación no encontrada'
                });
                return;
            }
    
            const [fotosRows]: any = await pool.query(
                'SELECT * FROM fundacion_foto WHERE IdFundacion = ?',
                [IdFundacion]
            );
    
            fundacionRows[0].Fotos = fotosRows;
    
            res.json({
                status: true,
                message: 'Todo Ok',
                data: fundacionRows
            });
    
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error del servidor'
            });
        }
    }
}

export const fundacionController = new FundacionController;