import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Defina o tipo para o payload do usuário
interface UserPayload {
    id: string;
    is_admin: boolean; // Change the type to boolean directly
    leader: string;
    squad?: string; 
}

// Crie uma nova interface que estende a interface Request do Express
interface CustomRequest extends Request {
    user?: UserPayload; // Adiciona a propriedade user ao objeto de solicitação
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
                // Atribui o payload do usuário decodificado à propriedade user do objeto de solicitação
                req.user = decoded as UserPayload;

                next();
            }
        });
    } catch (error) {
        return res.status(403).json({ error: "Invalid Token JWT" });
    }
};
