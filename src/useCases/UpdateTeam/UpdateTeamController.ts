import { Request, Response } from "express";
import { UpdateTeamUseCase } from "./UpdateTeamUseCase";
import { HttpError } from "../../errors/HttpError";
import { UpdateTeamDTO } from "./UpdateTeamDTO";

export class UpdateTeamController{
    constructor(private updateTeamUseCase: UpdateTeamUseCase){};

    public async handle(req: Request, res: Response){
        const paramsId: string = req.params.team_id;
        const { name, leader } = req.body;
        const { is_admin } = req.user || { is_admin: false };
        
        try {
            if(!req.user){
                throw new HttpError(401, 'User not authenticated');
            }

            const teamId = req.user.leader
            const userId = req.user.id

            if (!is_admin && teamId !== paramsId) {
                throw new HttpError(401, 'Unauthorized: Only leaders can change squad info');
            }

            const team: UpdateTeamDTO = {
                user_id: userId,
                is_admin: is_admin,
                id: paramsId,
                name: name,
                leader: leader
            }

            const result = await this.updateTeamUseCase.execute(team)

            if(result){
                return res.status(200).json({ success: 'Team updated successfully', team: result })
            }
        } catch(error){
            if(error instanceof HttpError){
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal serve error' })
        }

    }
}