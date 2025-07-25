import { Request, Response } from "express";
import pool from "../database";

class DoctorController{
    async getDoctors(req: Request, res: Response){
        const list = await pool.query('SELECT p.Nombres, p.Apellidos, p.Direccion, p.Foto, d.Rating from PERSONA p JOIN DOCTOR d ON p.IdPersona = d.IdPersona');
        res.json({
            message: 'Todo Correcto',
            status: true,
            data: list
        });
    }
}

export const doctorController = new DoctorController(); 