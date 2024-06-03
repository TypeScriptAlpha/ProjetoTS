import { Request, Response } from "express";
import { GetOwnUserUseCase } from "./GetOwnUserUseCase";
import { HttpError } from "../../errors/HttpError";
//DTO?

export class GetOwnUserController {
    constructor(private getOwnUserUseCase: GetOwnUserUseCase) {}

    public async handle(req: Request, res: Response): Promise<Response> {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        
        const userId = req.user.id;
        if(!userId){
            throw new HttpError(401, 'User not authenticated');
        }
        try {
            const user = await this.getOwnUserUseCase.execute(userId);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
// curl -X GET http://localhost:3000/users/me \
// -b "session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwOTZhY2NmLTQ4YjUtNDdmMi1hYWY2LTg0MGE2MDkxMDY5ZCIsImlzX2FkbWluIjpmYWxzZSwibGVhZGVyIjoiOGYzNmVjYTctODE5NS00ZjFjLTgzZjItZDdiMzcyMmI2NGM2IiwiaWF0IjoxNzE3MzU3NjE3LCJleHAiOjE3MTgyMjE2MTd9.MaMsfiG0w_8-9llfCELFlUdEq78fIJ5FRDba2RkHCOg"
