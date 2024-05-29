import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies.session_id;

        if(!sessionToken) {
            return res.status(401).json({ error: "Unauthorized: No tokens provided" })
        }
    
        jwt.verify(sessionToken, config.SECRET_KEY, (error:any) => {
            if (error){
                return res.status(403).json({ error: "Invalid Token JWT" });
            } else {
                next();
            }
        })
    } catch (error) {
        return res.status(403).json({ error: "Invalid Token JWT" })
    }

}