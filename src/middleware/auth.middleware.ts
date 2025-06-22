import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/* carga variable de entorno */
import dotenv from 'dotenv';
dotenv.config();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    const bearerToken = token.toString().replace('Bearer ', '');

    jwt.verify(bearerToken, process.env.ACCESS_SECRET || 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        res.locals.user = decoded;
        /* req.body.user = decoded */
        next();
    });
}
