import { Request, Response } from "express";
import { DeleteUserFromTeamUseCase } from "./DeleteUserFromTeamUseCase";
import { HttpError } from "../../errors/HttpError";

export class DeleteUserFromTeamController {
    constructor(private deleteUserFromTeamUseCase: DeleteUserFromTeamUseCase){}

    public async handle(req: Request, res: Response){
        const user_id: string = req.params.user_id;
        const team_id: string = req.params.team_id;
        
        try{
            const { is_admin } = req.user || { is_admin: false };
            const { leader } = req.user || { leader: '' };

            if(!is_admin && leader === ''){
                throw new HttpError(403, 'Unauthorized: Only admin and team leader can perform this action');
            }

            const result = await this.deleteUserFromTeamUseCase.execute({user_id, team_id});

            const user = {
                id: result?.id,
                username: result?.username,
                email: result?.email,
                first_name: result?.first_name,
                last_name: result?.last_name,
                squad: result?.squad,
            }

            if (result){
                return res.status(200).json({ success: 'User removed from the team', user: user});
            }
    
        } catch(error){
            if (error instanceof HttpError){
                return res.status(error.status).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'Internal serve error' });
            }
        }
    }
}