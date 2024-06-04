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