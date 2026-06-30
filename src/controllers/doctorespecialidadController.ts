import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../database";
import { errorResponse, successResponse } from "../helpers/response.helper";

class DoctorEspecialidadController{
    async listDoctorEspecialidad(req: Request, res: Response): Promise<any>{
        const { IdDoctor } = req.params;
        try{
            const [list] = await pool.query<RowDataPacket[]>('SELECT d.IdDoctor, e.Descripcion, e.Lugar_Estudios, e.Icono from doctor d INNER JOIN doctor_especialidad de ON d.IdDoctor = de.IdDoctor INNER JOIN especialidad e ON de.IdEspecialidad = e.IdEspecialidad WHERE d.IdDoctor = ?', [IdDoctor]);
            return successResponse(res, 'Listado Correcto', list);
        }catch(error){
            console.log('Listado Especialidades Doctor', error);
            return errorResponse(res, 'Error en el Servidor');
        }
    } 
}

export const doctorespecialistaController = new DoctorEspecialidadController();