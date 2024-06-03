import { Request, Response } from "express";
import { GetTeamMembersUseCase } from "./GetTeamMembersUseCase";

export class GetTeamMembersController {
    constructor(private getTeamMembersUseCase: GetTeamMembersUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const team_id = req.params.team_id;

        try {
            const members = await this.getTeamMembersUseCase.execute(team_id);
            res.json(members);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Unexpected error.' });
        }
    }
}
// curl -X GET http://localhost:3000/teams/8f36eca7-8195-4f1c-83f2-d7b3722b64c6/members \
// -b "session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwOTZhY2NmLTQ4YjUtNDdmMi1hYWY2LTg0MGE2MDkxMDY5ZCIsImlzX2FkbWluIjpmYWxzZSwibGVhZGVyIjoiOGYzNmVjYTctODE5NS00ZjFjLTgzZjItZDdiMzcyMmI2NGM2IiwiaWF0IjoxNzE3MzU3NjE3LCJleHAiOjE3MTgyMjE2MTd9.MaMsfiG0w_8-9llfCELFlUdEq78fIJ5FRDba2RkHCOg"