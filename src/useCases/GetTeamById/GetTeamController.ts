import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpError";
import { GetTeamUseCase } from "./GetTeamUseCase";

interface UserPayload {
    id: string;
    is_admin: boolean;
    leader: string;
    squad?: string; 
}


interface CustomRequest extends Request {
    user?: UserPayload; 
}

export class GetTeamController {
    constructor(private getTeamUseCase: GetTeamUseCase) {}

    public async handle(req: CustomRequest, res: Response): Promise<Response> {
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