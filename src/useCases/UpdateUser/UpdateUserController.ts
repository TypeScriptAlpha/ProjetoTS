import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { HttpError } from "../../errors/HttpError";

export class UpdateUserController {
    constructor(private updateUserUseCase: UpdateUserUseCase){}

    public async handle(req: Request, res: Response){
        const paramsId: string = req.params.user_id;
        const { username, email, first_name, last_name, password } = req.body

        try{            
            if(!req.user){
                throw new HttpError(401, 'User not authenticated');
            }

            const { is_admin } = req.user || { is_admin: false }

            if(is_admin){
                try{
                    const result = await this.updateUserUseCase.executeAdmin(paramsId);

                    if (result){
                        return res.status(200).json({ success: 'User updated successfully', user: result });
                    }

                } catch(error: any){

                    if (error instanceof HttpError){
                        return res.status(error.status).json({ error: error.message });
                    }
                    
                    return res.status(500).json({ error: 'Internal serve error' })
                }
            }

            const id = req.user.id

            if(!id){
                throw new HttpError(401, 'Unauthorized: Only logged users can make changes');
            }

            if (id !== paramsId){
                throw new HttpError(401, 'Unauthorized: Users can only change their own account');
            }
            const user = {
                id: id,
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
            }

            const result = await this.updateUserUseCase.execute(user)

            if (result){
                return res.status(200).json({ success: 'User updated successfully', user: result });
            }
        } catch(error){
            if (error instanceof HttpError){
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal serve error' })
        }
    }
}