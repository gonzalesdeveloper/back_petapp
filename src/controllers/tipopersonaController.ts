import { Request, Response } from "express";
import pool from "../database";

class TipoPersonaController{
    async getTipoPersona(req: Request, res: Response){
        const list = await pool.query("SELECT * FROM TIPOPERSONA");
        res.json({
            data: list,
            status: true,
            message: "Todo Correcto"
        });
    }
}

export const tipoPersonaController = new TipoPersonaController();