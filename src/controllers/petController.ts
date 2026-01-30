import { Request, Response } from "express";
import pool from "../database";


class PetController{
    public async listPetOneLost(req: Request, res: Response){
        const { IdPet } = req.params;
        const [list]: any = await pool.query("SELECT p.IdPet, p.Nombre, p.Apellidos, tm.Descripcion as Tipo, r.Descripcion as Raza, c.Descripcion as Color, p.Edad, p.Peso, p.Medida, p.Foto, p.Detalle, mp.Descripcion, mp.Lugar_Perdida, mp.Ciudad, mp.Fecha_Perdida, mp.Numero_Contacto, mp.Referencia FROM pet p INNER JOIN mascota_perdida mp ON p.IdPet = mp.IdPet INNER JOIN  tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota INNER JOIN raza r ON p.IdRaza = r.IdRaza INNER JOIN color c ON p.IdColor = c.IdColor WHERE p.IdPet = ? and p.Tipo = 'perdida'", [IdPet]);

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

    public async listPetLost(req: Request, res: Response){
        const [list]: any = await pool.query("SELECT p.IdPet, p.Nombre, p.Apellidos, p.Foto, tm.Descripcion as Tipo, mp.Lugar_Perdida, mp.Ciudad, mp.Referencia FROM pet p INNER JOIN mascota_perdida mp ON p.IdPet = mp.IdPet INNER JOIN  tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota  WHERE p.Tipo = 'perdida'");
        
        res.json({
            data: list,
            status: true,
            message: "Listo Correcto"
        })
    }

    public async listPetAdoption(req: Request, res: Response){
        const [list] = await  pool.query(`
        SELECT 
        p.IdPet,
        p.Nombre,
        p.Apellidos,
        p.Foto,
        tm.Descripcion AS TipoMascota,
        p.Edad,
        p.Peso,
        
        ma.Estado,
        ma.Fecha_Registro,
        ma.Lugar_Entrega,
        ma.Vacunas_Completas,
        ma.Castrado,
        ma.Tipo_Adopcion,
        ma.Costo_Adopcion,
        ma.Contacto,
        ma.Descripcion AS Detalle_Adopcion
        
        FROM pet p

        INNER JOIN mascota_adopcion ma ON p.IdPet = ma.IdPet
        INNER JOIN tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota

        WHERE p.Tipo = 'adopcion';
      `);

      res.json({
        data: list,
        message: 'Todo Ok',
        status: true
      })
    }

    public async listPetOneAdoption(req:Request, res: Response){
        const { IdPersona , IdPet } = req.params;
        const [list] = await  pool.query(`
        SELECT 
        p.IdPet,
        p.Nombre,
        p.Apellidos,
        p.Foto,
        tm.Descripcion AS TipoMascota,
        p.Edad,
        p.Peso,
        
        ma.Estado,
        ma.Fecha_Registro,
        ma.Lugar_Entrega,
        ma.Vacunas_Completas,
        ma.Castrado,
        ma.Tipo_Adopcion,
        ma.Costo_Adopcion,
        ma.Contacto,
        ma.Descripcion AS Detalle_Adopcion,
        
        CASE 
        WHEN mf.IdPet IS NULL THEN false
        ELSE true
        END AS EsFavorito

        FROM pet p

        INNER JOIN mascota_adopcion ma ON p.IdPet = ma.IdPet
        INNER JOIN tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota
        LEFT JOIN favpet mf 
        ON mf.IdPet = p.IdPet AND mf.IdPersona = ?

        WHERE p.Tipo = 'adopcion'
        AND p.IdPet = ?
        LIMIT 1 ;
      `, [IdPersona, IdPet]);

      res.json({
        data: list,
        message: 'Todo Ok',
        status: true
      })
    }
}

export const petController = new PetController();