import { Request, Response } from "express";

export class LogoutUserController{
    public async handle(req: Request, res: Response) {
        const sessionToken = req.cookies.session_id;
        if(sessionToken){
            res.clearCookie('session_id');
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ message: 'User not logged' })
        }
    }
}