import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpError";
import { GetTeamUseCase } from "./GetTeamUseCase";

export class GetTeamController {
    constructor(private getTeamUseCase: GetTeamUseCase) {}

    public async handle(req: Request, res: Response): Promise<Response> {
        const { team_id } = req.params;
        const requester_id = req.user?.id || '';
        const is_admin = req.user?.is_admin || false;
        const requester_squad_id = req.user?.squad || '';

        try {
            const team = await this.getTeamUseCase.execute(team_id, requester_id, is_admin, requester_squad_id);
            return res.status(200).json(team);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
// curl -X GET http://localhost:3000/teams/8f36eca7-8195-4f1c-83f2-d7b3722b64c6 \
// -b "session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwOTZhY2NmLTQ4YjUtNDdmMi1hYWY2LTg0MGE2MDkxMDY5ZCIsImlzX2FkbWluIjpmYWxzZSwibGVhZGVyIjoiOGYzNmVjYTctODE5NS00ZjFjLTgzZjItZDdiMzcyMmI2NGM2IiwiaWF0IjoxNzE3MzU3NjE3LCJleHAiOjE3MTgyMjE2MTd9.MaMsfiG0w_8-9llfCELFlUdEq78fIJ5FRDba2RkHCOg"
