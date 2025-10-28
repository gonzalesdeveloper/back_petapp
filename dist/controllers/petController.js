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
    listPetOneLost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdPet } = req.params;
            const [list] = yield database_1.default.query("SELECT p.IdPet, p.Nombre, p.Apellidos, tm.Descripcion as Tipo, r.Descripcion as Raza, c.Descripcion as Color, p.Edad, p.Peso, p.Medida, p.Foto, p.Detalle, mp.Descripcion, mp.Lugar_Perdida, mp.Ciudad, mp.Fecha_Perdida, mp.Numero_Contacto, mp.Referencia FROM pet p INNER JOIN mascota_perdida mp ON p.IdPet = mp.IdPet INNER JOIN  tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota INNER JOIN raza r ON p.IdRaza = r.IdRaza INNER JOIN color c ON p.IdColor = c.IdColor WHERE p.IdPet = ? and p.Tipo = 'perdida'", [IdPet]);
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
            const [list] = yield database_1.default.query("SELECT p.IdPet, p.Nombre, p.Apellidos, p.Foto, tm.Descripcion as Tipo, mp.Lugar_Perdida, mp.Ciudad, mp.Referencia FROM pet p INNER JOIN mascota_perdida mp ON p.IdPet = mp.IdPet INNER JOIN  tipomascota tm ON p.IdTipoMascota = tm.IdTipoMascota  WHERE p.Tipo = 'perdida'");
            res.json({
                data: list,
                status: true,
                message: "Listo Correcto"
            });
        });
    }
}
exports.petController = new PetController();
