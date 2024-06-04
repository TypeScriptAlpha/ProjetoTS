import { Request, Response } from "express";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";
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

export class ListAllUsersController {
    public constructor(private listAllUserUseCase: ListAllUsersUseCase){}

    public async handle(req: CustomRequest, res:Response){
        try{
            const is_admin = req.user?.is_admin ?? false; 

            if(!is_admin){
                throw new HttpError(403, 'Unauthorized: Only admin can perform this action');
            }

            const result = await this.listAllUserUseCase.execute();

            return res.status(200).json(result);

        } catch (error){
            if (error instanceof HttpError){
                return res.status(error.status).json({ message: error.message })
            }
            return res.status(500).json({ error : 'Internal Server error' });
        }
    }
}
// curl -X GET http://localhost:3000/users \
// -b "session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0Zjc0OWM3LWY3NzctNDVmNi05OWJiLTBmYzI2YTgwOTAwZCIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE3MTcyMDE4OTQsImV4cCI6MTcxODA2NTg5NH0.VhA29-4uLLA3KkcxG8f6LBt6PIG11bdqof9SGUfqNHg"
