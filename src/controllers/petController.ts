import { Request, Response } from "express";
import pool from "../database";


class PetController{
    public async listPetLost(req: Request, res: Response){
        const [list]: any = await pool.query("SELECT p.IdPet, p.Nombre, p.Apellidos, tm.Descripcion as Tipo, r.Descripcion as Raza, c.Descripcion as Color, p.Edad, p.Peso, p.Medida, p.Foto, p.Detalle, mp.Descripcion, mp.Lugar_Perdida, mp.Ciudad, mp.Fecha_Perdida, mp.Numero_Contacto, mp.Referencia FROM pet p INNER JOIN mascota_perdida mp ON p.IdPet = mp.IdPet INNER JOIN  tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota INNER JOIN raza r ON p.IdRaza = r.IdRaza INNER JOIN color c ON p.IdColor = c.IdColor WHERE p.Tipo = 'perdida'");

        for (let index = 0; index < list.length; index++) {
            const fecha = new Date(list[index].Fecha_Perdida);
            const fechaFormateada = fecha.toISOString().split('T')[0];
            list[0].Fecha_Perdida = fechaFormateada;
        }
        
        res.json({
            data: list,
            status: true,
            message: "Listo Correcto"
        })
    }
}

export const petController = new PetController();