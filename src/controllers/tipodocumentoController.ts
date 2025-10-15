import { Request, Response } from "express";
import pool from "../database";

class TipoDocumentoController{

    async getTipoDocumento(req: Request, res: Response){
        const [list] = await pool.query("SELECT * FROM tipodocumento");
        res.json({
            data: list,
            status: true,
            message: "Todo Correcto"
        });
    }
}


export const tipoDocumentoController = new TipoDocumentoController();