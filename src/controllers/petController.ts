import { Request, Response } from "express";
import pool from "../database";


class PetController{
    public async listPet(req: Request, res: Response){
        const list = await pool.query("SELECT * FROM PET");
        res.json({
            data: list,
            status: true,
            message: "Listo Correcto"
        })
    }
}

export const petController = new PetController();