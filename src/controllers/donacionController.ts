import { Request, Response } from "express";
import pool from "../database";

class DonacionController{
    async insertDonacion(req: Request, res: Response){
        const { IdFundacion, IdPersona, Monto, MetodoPago, Mensaje } = req.body;
        await pool.query('INSERT INTO donacion (IdFundacion, IdPersona, Monto, MetodoPago, Mensaje) values (?,?,?,?,?)'
                        , [ IdFundacion, IdPersona, Monto, MetodoPago, Mensaje ]);
        res.json({
            status: true,
            message: 'Guardado con Éxito'
        })
    }

    async listMetodoDonacion(req: Request, res: Response){
        const { IdFundacion } = req.params;
        const [ list ] = await pool.query('SELECT td.IdTipoDonacion, td.Nombre, td.Icono, td.Req_Datos, fd.Detalle FROM donacionfundacion fd INNER JOIN tipodonacion td ON td.IdTipoDonacion = fd.IdTipoDonacion WHERE fd.IdFundacion = ?;', [ IdFundacion]);
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        })
    }


    async listDonacion(req: Request, res: Response){
        const { IdPersona } = req.params;
        const [ list ] = await pool.query('SELECT d.IdDonacion, d.Monto, d.MetodoPago, d.Fecha, d.Estado, f.Nombre   AS Fundacion, f.Ubicacion FROM donacion d INNER JOIN fundacion f ON d.IdFundacion = f.IdFundacion WHERE d.IdPersona = ?', [ IdPersona ]);
        res.json({
            status: true,
            message: 'Todo Ok',
            data: list
        })
    }
}

export const donacionController = new DonacionController();