import { Request, Response } from "express";
import pool from "../database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

class AuthController{
    public async login(req: Request, res: Response): Promise<any> {
        const { username, password } = req.body;
        try {
          const [rows]: any = await pool.query('SELECT * FROM PERSONA WHERE usuario = ?', [username]);
          if (rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });
    
          const user = rows[0];
          const match = await bcrypt.compare(password, user.password);
          if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });
    
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, {
            expiresIn: '2h'
          });
    
          res.json({ message: 'Login exitoso', token });
        } catch (error) {
          res.status(500).json({ error: 'Error en el login' });
        }
    }

    public async register(req: Request, res: Response){
        const { username, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await pool.query(
            'INSERT INTO PERSONA (username, password) VALUES (?, ?)',
            [username, hashedPassword]
            );
            res.status(201).json({ message: 'Usuario registrado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    }
}

export const authController = new AuthController();