import { Request, Response } from "express";
import pool from "../database";


class PetController{
  /* pet lost */
    public async listPetOneLost(req: Request, res: Response){
        const { IdPersona , IdPet } = req.params;
        
        const [ list ] : any = await pool.query(`SELECT 
          p.IdPet,
          p.Nombre,
          p.Apellidos,
          tm.Descripcion AS Tipo,
          r.Descripcion AS Raza,
          c.Descripcion AS Color,
          p.Edad,
          p.Peso,
          p.Medida,
          p.Foto,
          p.Detalle,
      
          mp.Descripcion,
          mp.Lugar_Perdida,
          mp.Ciudad,
          mp.Fecha_Perdida,
          mp.Numero_Contacto,
          mp.Referencia,
      
          CASE 
              WHEN fp.IdPet IS NULL THEN 0 
              ELSE 1 
          END AS EsFavorito
      
          FROM pet p
          INNER JOIN mascota_perdida mp ON p.IdPet = mp.IdPet
          INNER JOIN tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota
          INNER JOIN raza r ON p.IdRaza = r.IdRaza
          INNER JOIN color c ON p.IdColor = c.IdColor
          
          LEFT JOIN favpet fp
              ON fp.IdPet = p.IdPet 
              AND fp.IdPersona = ?
          
          WHERE p.IdPet = ?
          AND p.Tipo = 'perdida';
        `, [ IdPersona, IdPet]);

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
        const { IdPersona } = req.params;
        const [list]: any = await pool.query(`SELECT 
          p.IdPet,
          p.Nombre,
          p.Apellidos,
          p.Foto,
          tm.Descripcion AS Tipo,
          mp.Lugar_Perdida,
          mp.Ciudad,
          mp.Referencia,
      
          CASE 
              WHEN fp.IdPet IS NULL THEN 0 
              ELSE 1 
          END AS EsFavorito
      
          FROM pet p
          INNER JOIN mascota_perdida mp ON p.IdPet = mp.IdPet
          INNER JOIN tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota
          
          LEFT JOIN favpet fp
              ON fp.IdPet = p.IdPet
              AND fp.IdPersona = ?
          
          WHERE p.Tipo = 'perdida';
          `, [ IdPersona ]);
        
        res.json({
            data: list,
            status: true,
            message: "Listo Correcto"
        })
    }

    /* pet adopcion */
    /* public async listPetAdoption(req: Request, res: Response){
      const { IdPersona } = req.params;
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

        WHERE p.Tipo = 'adopcion'
        AND ma.Estado = 'Disponible'
        AND ma.IdMascotaAdopcion NOT IN (
          SELECT IdMascotaAdopcion
          FROM solicitud_adopcion
          WHERE IdPersona = ?
        );;
      `, [IdPersona]);

      res.json({
        data: list,
        message: 'Todo Ok',
        status: true
      })
    } */

    public async listPetAdoption(req: Request, res: Response){
      const { IdPersona } = req.params;
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

        pub.Nombre_Contacto,
        pub.Telefono_Contacto

      FROM pet p

      INNER JOIN mascota_adopcion ma ON p.IdPet = ma.IdPet
      INNER JOIN tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota

      -- 🔥 NUEVO
      INNER JOIN publicacion pub 
        ON pub.IdPet = p.IdPet

      WHERE pub.TipoPublicacion = 'adopcion'
      AND pub.Estado = 'aprobado'
      AND ma.Estado = 'Disponible'

      AND ma.IdMascotaAdopcion NOT IN (
        SELECT IdMascotaAdopcion
        FROM solicitud_adopcion
        WHERE IdPersona = ?
      );
      `, [IdPersona]);

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
        
        ma.IdMascotaAdopcion,
        ma.Estado,
        ma.Fecha_Registro,
        ma.Lugar_Entrega,
        ma.Vacunas_Completas,
        ma.Castrado,
        ma.Tipo_Adopcion,
        ma.Costo_Adopcion,
        ma.Contacto,
        ma.Descripcion AS Detalle_Adopcion,

        pub.Nombre_Contacto,
        pub.Telefono_Contacto,
        pub.Relacion,

        CASE 
          WHEN mf.IdPet IS NULL THEN false
          ELSE true
        END AS EsFavorito

      FROM pet p

      INNER JOIN mascota_adopcion ma ON p.IdPet = ma.IdPet
      INNER JOIN tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota

      LEFT JOIN favpet mf 
        ON mf.IdPet = p.IdPet AND mf.IdPersona = ?

      -- 🔥 NUEVO JOIN
      INNER JOIN publicacion pub 
        ON pub.IdPet = p.IdPet 
        AND pub.TipoPublicacion = 'adopcion'
        AND pub.Estado = 'aprobado'

      WHERE p.Tipo = 'adopcion'
      AND p.IdPet = ?
      LIMIT 1;
    `, [IdPersona, IdPet]);

    res.json({
      data: list,
      message: 'Todo Ok',
      status: true
    })
  }

    async listMyAdoptions(req: Request, res: Response){
      const { IdPersona } = req.params;
      const [ list ] = await pool.query(`SELECT sa.IdSolicitud, sa.Estado_Solicitud, sa.Fecha_Solicitud, p.Nombre, p.Edad, p.Foto,
      tm.Descripcion AS TipoMascota, p.Peso
      
      FROM solicitud_adopcion sa
      
      INNER JOIN mascota_adopcion ma 
        ON sa.IdMascotaAdopcion = ma.IdMascotaAdopcion
      
      INNER JOIN pet p 
        ON ma.IdPet = p.IdPet
      
      INNER JOIN tipomascota tm 
        ON p.IdTipoMascota = tm.IdTipoMascota
      
      WHERE sa.IdPersona = ?
      
      ORDER BY sa.Fecha_Solicitud DESC;`, [ IdPersona ]);
      res.json({
        status: true,
        message: 'Todo Ok',
        data: list
      })
    }
}

export const petController = new PetController();