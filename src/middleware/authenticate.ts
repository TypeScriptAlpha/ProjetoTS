import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface UserPayload {
    id: string;
    is_admin: boolean;
    leader: string;
    squad?: string; 
}

interface CustomRequest extends Request {
    user?: UserPayload; 
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies.session_id;

        if (!sessionToken) {
            return res.status(401).json({ error: "Unauthorized: No tokens provided" });
        }
    
        jwt.verify(sessionToken, config.SECRET_KEY, async (error: any, decoded: any) => {
            if (error) {
                return res.status(403).json({ error: "Invalid Token JWT" });
            } else {
                req.user = decoded as UserPayload;

                next();
            }
        });
    } catch (error) {
        return res.status(403).json({ error: "Invalid Token JWT" });
    }
};
