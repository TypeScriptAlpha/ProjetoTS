import { Request, Response } from "express";
import { ListAllTeamsUseCase } from "./ListAllTeamsUseCase";
import { HttpError } from "../../errors/HttpError";

interface UserPayload {
    id: string;
    is_admin: boolean;
    leader: string;
    squad?: string; 
}


interface CustomRequest extends Request {
    user?: UserPayload; 
}

export class ListAllTeamsController {
    public constructor(private listAllTeamUseCase: ListAllTeamsUseCase){}

    public async handle(req: CustomRequest, res:Response){
        try{
            const is_admin = req.user?.is_admin ?? false;
            const is_leader = req.user?.leader ?? false;

            if(!is_admin && !is_leader){
                throw new HttpError(403, 'Unauthorized: Only admin and team leaders can perform this action');
            }

            const result = await this.listAllTeamUseCase.execute();

            return res.status(200).json(result);

        } catch (error){
            if (error instanceof HttpError){
                return res.status(error.status).json({ message: error.message })
            }
            return res.status(500).json({ error : 'Internal Server error' });
        }
    }
}