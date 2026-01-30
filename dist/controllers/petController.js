"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petController = void 0;
const database_1 = __importDefault(require("../database"));
class PetController {
    /* pet lost */
    listPetOneLost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona, IdPet } = req.params;
            const [list] = yield database_1.default.query(`SELECT 
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
        `, [IdPersona, IdPet]);
            for (let index = 0; index < list.length; index++) {
                const fecha = new Date(list[index].Fecha_Perdida);
                const fechaFormateada = fecha.toISOString().split('T')[0];
                list[0].Fecha_Perdida = fechaFormateada;
            }
            res.json({
                data: list,
                status: true,
                message: "Listo Correcto"
            });
        });
    }
    listPetLost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona } = req.params;
            const [list] = yield database_1.default.query(`SELECT 
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
          `, [IdPersona]);
            res.json({
                data: list,
                status: true,
                message: "Listo Correcto"
            });
        });
    }
    /* pet adopcion */
    listPetAdoption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [list] = yield database_1.default.query(`
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
            });
        });
    }
    listPetOneAdoption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPersona, IdPet } = req.params;
            const [list] = yield database_1.default.query(`
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
            });
        });
    }
}
exports.petController = new PetController();
