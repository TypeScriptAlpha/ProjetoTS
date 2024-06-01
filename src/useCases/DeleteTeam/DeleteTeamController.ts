import { Request, Response } from "express";
import { DeleteTeamUseCase } from "./DeleteTeamUseCase";
import { HttpError } from "../../errors/HttpError";

export class DeleteTeamController{
    constructor(private deleteTeamUseCase: DeleteTeamUseCase){}

    public async handle(req: Request, res: Response){
        const team_id: string = req.params.team_id;

        const { is_admin } = req.user || { is_admin: false }

        if(!is_admin){
            throw new HttpError(403, 'Unauthorized: Only admin can perform this action')
        }

        try{
            const result = await this.deleteTeamUseCase.execute({ team_id });

            const team = {
                id: result.id,
                name: result.name,
                leader: result.leader
            }

            if(result){
                return res.status(200).json({ success: 'Team deleted successfully', team: team });
            }
        } catch(error){
            if(error instanceof HttpError){
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal Server error' });
        }
    }
}