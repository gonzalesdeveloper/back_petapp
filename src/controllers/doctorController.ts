import { Request, Response } from "express";
import pool from "../database";

class DoctorController{
    async getDoctors(req: Request, res: Response){
        const list = await pool.query('SELECT * FROM DOCTOR, PERSONA')
    }
}

export const doctorController = new DoctorController(); 