import jwt from 'jsonwebtoken';
/* carga variable de entorno */
import dotenv from 'dotenv';
dotenv.config();

const refresh = process.env.REFRESH_SECRET!;
const access = process.env.ACCESS_SECRET!;

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, access, {
    expiresIn:'30m'
  });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, refresh, {
    expiresIn:'7d'
  });
};