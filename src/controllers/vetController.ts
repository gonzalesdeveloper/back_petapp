import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

class VetController{
    public async listVet(req: Request, res: Response): Promise<any>{
        try{
            const [list] = await pool.query<RowDataPacket[]>('SELECT * FROM veterinaria');
            return successResponse(res, 'Listado Correctamente', list);
        }catch(error){
            console.log('Error al listar veterinarias', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }

    public async listVetUnique(req: Request, res: Response): Promise<any>{
        const { IdVeterinaria } = req.params;
        try{
            const [list] = await pool.query<RowDataPacket[]>('SELECT * FROM veterinaria WHERE IdVeterinaria = ?', IdVeterinaria);
            return successResponse(res, 'Listado Correctamente', list);
        }catch(error){
            console.log('Error al obtener una veterinaria', error);
            return errorResponse(res, 'Error del Servidor');
        }
    }
}

export const vetController = new VetController();