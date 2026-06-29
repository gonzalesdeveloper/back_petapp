import { RowDataPacket } from "mysql2";

export interface ITablaComentario {
    tabla: string;
    id: string;
}

export interface IPromedioComentario extends RowDataPacket {
    promedio: number;
}