import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

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


    public async getOneFundation(req: Request, res: Response): Promise<any>{
        try {
            const { IdFundacion } = req.params;
    
            const [fundacionRows] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM fundacion WHERE IdFundacion = ?',
                [IdFundacion]
            );
    
            if (fundacionRows.length === 0) {
                return errorResponse(res, 'Fundacion no encontrada', 404);
            }
    
            const [fotosRows] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM fundacion_foto WHERE IdFundacion = ?',
                [IdFundacion]
            );
    
            fundacionRows[0].Fotos = fotosRows;
            
            return successResponse(res, 'Fundacion Encontrada', fundacionRows);    
        } catch (error) {
            console.log('Fundacion Unica', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }
}

export const fundacionController = new FundacionController;