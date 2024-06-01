import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { HttpError } from "../../errors/HttpError";

export class DeleteUserController {
    constructor(private deleteUserUserCase: DeleteUserUseCase){}

    public async handle(req: Request, res: Response){
        const id: string = req.params.user_id;

        const { is_admin } = req.user || { is_admin: false };

        if(!is_admin){
            throw new HttpError(403, 'Unauthorized: Only admin can perform this action');
        }

        try{
            const result = await this.deleteUserUserCase.execute({ id });

            const user = {
                id: result.id,
                username: result.username,
                email: result.email,
                first_name: result.first_name,
                last_name: result.last_name,
                squad: result.squad
            }

            if (result){
                return res.status(200).json({ success: 'User deleted successfully', user: user });
            }
        } catch(error){
            if (error instanceof HttpError){
                return res.status(error.status).json({ error: error.message })
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}