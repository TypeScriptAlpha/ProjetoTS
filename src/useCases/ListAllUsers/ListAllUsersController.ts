import { Request, Response } from "express";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";
import { HttpError } from "../../errors/HttpError";

export class ListAllUsersController {
    public constructor(private listAllUserUseCase: ListAllUsersUseCase){}

    public async handle(req: Request, res:Response){
        try{
            const { is_admin } = req.user || { is_admin: false };

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