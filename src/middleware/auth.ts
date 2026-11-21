import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../db";


const auth = async (req: Request, res: Response, next: NextFunction)=> {
    //* 1-> Check token Exists?
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({
            success: false,
            message: "Unauthorized access!!",
        })
    }

    //*2-> Check token ar valid?
    const decoded = jwt.verify(token as string, config.jwt_secret) as JwtPayload

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [decoded.email])
    
    //*3-> Check if the User exists?
    if(user.rowCount === 0){
        res.status(404).json({
            success: false,
            message: "Unauthorized access! User not found!",
        })
    }
    //*4-> Check if the User status exists?
    if(!user.rows[0].is_active){
        res.status(403).json({
            success: false,
            message: "Forbidden!!",
        })
    }

   

    next()
}

export default auth;