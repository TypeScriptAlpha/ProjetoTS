import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpError";
import { GetUserUseCase } from "./getUserUseCase";

export class GetUserController {
    constructor(private getUserUseCase: GetUserUseCase) {}

    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.params;
        const requester_id = req.user?.id || '';
        const is_admin = req.user?.is_admin || false;
        const requester_leader_id = req.user?.leader;  // Se existir, indica que é líder de uma equipe

        try {
            const user = await this.getUserUseCase.execute(user_id, requester_id, is_admin, requester_leader_id);
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
// curl -X GET http://localhost:3000/users/582a0898-3d5a-4aff-a414-419736485ef1 \
// -b "session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwOTZhY2NmLTQ4YjUtNDdmMi1hYWY2LTg0MGE2MDkxMDY5ZCIsImlzX2FkbWluIjpmYWxzZSwibGVhZGVyIjoiOGYzNmVjYTctODE5NS00ZjFjLTgzZjItZDdiMzcyMmI2NGM2IiwiaWF0IjoxNzE3MzU3NjE3LCJleHAiOjE3MTgyMjE2MTd9.MaMsfiG0w_8-9llfCELFlUdEq78fIJ5FRDba2RkHCOg"
