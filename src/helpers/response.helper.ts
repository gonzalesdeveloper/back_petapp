import { Response } from 'express';

export const successResponse = (
    res: Response,
    message: string,
    data: any = null,
    statusCode = 200
    ) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data
    });
};

export const errorResponse = (
    res: Response,
    message: string,
    statusCode = 500,
    data: any = null
    ) => {
    return res.status(statusCode).json({
        status: false,
        message,
        data
    });
};