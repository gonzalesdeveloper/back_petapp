import { Request, Response } from "express";
import pool from "../database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { generateAccessToken, generateRefreshToken } from '../utils/token.util';

/* carga variable de entorno */
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = 10;
const refresh = process.env.REFRESH_SECRET!;
const access = process.env.ACCESS_SECRET!;

class AuthController{

    /* LOGIN NORMAL */
    public async login(req: Request, res: Response): Promise<any> {
        const { Email, Password } = req.body;
        
        try {
          
          const [rows]: any = await pool.query('SELECT * FROM persona WHERE Email = ?', [Email]);

          if (rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });
    
          const user = rows[0];
          
          const match = await bcrypt.compare(Password, user.Password);

          if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

          const payload = { IdPersona: user.IdPersona, Email: user.Email };
          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);

          res.json({
            message: 'Logeo exitoso',
            accessToken,
            refreshToken
          });

          /* const token = jwt.sign({ IdPersona: user.IdPersona, Email: user.Email }, process.env.JWT_SECRET as string, {
            expiresIn: '2h'
          });  
    
          res.json({ message: 'Login exitoso', token }); */
    
        } catch (error) {
          console.log(error);
          
          res.status(500).json({ error: 'Error en el login' });
        }
    }

    /* REGISTER NORMAL */
    public async register(req: Request, res: Response){
      
      const { IdTipoPersona, IdTipoDocumento, NumDocumento, Nombres, Apellidos, Direccion, Referencia, Ciudad, Nacimiento, Email, Foto, Usuario, Password, Estado } = req.body;
      try {
            const hashedPassword = await bcrypt.hash(Password, saltRounds);

            await pool.query(
            'INSERT INTO persona (IdTipoPersona, IdTipoDocumento, NumDocumento, Nombres, Apellidos, Direccion, Referencia, Ciudad, Nacimiento, Email, Foto, Usuario, Password, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [IdTipoPersona, IdTipoDocumento, NumDocumento, Nombres, Apellidos, Direccion, Referencia, Ciudad, Nacimiento, Email, Foto, Usuario, hashedPassword, Estado]
            );
            res.status(201).json({ 
              message: 'Usuario registrado',
            });
        } catch (error) {
            res.status(500).json({ 
              error: 'Error al registrar usuario'
            });
        }
    }

    public async refreshToken(req: Request, res: Response){
      // Ruta para refrescar token
      const { refreshToken } = req.body;
      try {
        const payload: any = jwt.verify(refreshToken, refresh); // otro secreto
        const newAccessToken = generateAccessToken({ IdPersona: payload.IdPersona, Email: payload.Email });
        /* const newAccessToken = jwt.sign({ IdPersona: payload.IdPersona }, access, { expiresIn: '15m' }); */
        res.json({ accessToken: newAccessToken });
      } catch {
        res.status(401).json({ error: 'Refresh token inválido o expirado' });
      }
    }
}

export const authController = new AuthController();