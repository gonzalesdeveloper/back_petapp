import { Request, Response } from "express";
import pool from "../database";

class DoctorEspecialidadController{
    async listDoctorEspecialidad(req: Request, res: Response){
        const { IdDoctor } = req.params;
        console.log(IdDoctor);
        
        const list = await pool.query('SELECT d.IdDoctor, e.Descripcion, e.Lugar_Estudios, e.Icono from Doctor d INNER JOIN doctor_especialidad de ON d.IdDoctor = de.IdDoctor INNER JOIN Especialidad e ON de.IdEspecialidad = e.IdEspecialidad WHERE d.IdDoctor = ?', [IdDoctor]);
        res.json({
            message: 'Todo ok',
            status: true,
            data: list
        });
    } 
}

export const doctorespecialistaController = new DoctorEspecialidadController();