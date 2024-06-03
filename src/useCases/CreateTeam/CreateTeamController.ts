import { Request, Response } from "express";
import { CreateTeamUseCase } from "./CreateTeamUseCase";
import { HttpError } from "../../errors/HttpError";
import { TeamData } from "./CreateTeamDTO";
export class CreateTeamController {
    constructor(private createTeamUseCase: CreateTeamUseCase){}

    public async handle(req: Request, res: Response): Promise<Response>{
        const { name, leader } = req.body
        
        try{
            const { is_admin } = req.user || { is_admin: false };
            
            if(!is_admin){
                throw new HttpError(403, 'Unauthorized: Only admin can perform this action');
            }
            
            const newTeam: TeamData = await this.createTeamUseCase.execute({
                name: name,
                leader: leader
            })

            const teamResponse: TeamData = {
                id: newTeam.id,
                name: newTeam.name,
                leader: newTeam.leader,
            };
            
            return res.status(201).json({ user: teamResponse });
        } catch (error) {
            if (error instanceof HttpError){
                return res.status(error.status).json({ message: error.message})
            }
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
