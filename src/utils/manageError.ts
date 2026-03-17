import { Request, Response } from "express";

export const asyncHandler = (fn: Function) => 
    (req: Request, res: Response) => 
        Promise.resolve(fn(req, res)).catch(err => 
            res.status(500).json({ status: false, message: err.message })
        );