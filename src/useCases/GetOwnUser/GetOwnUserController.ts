import { Request, Response } from "express";
import { GetOwnUserUseCase } from "./GetOwnUserUseCase";
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

export class GetOwnUserController {
    constructor(private getOwnUserUseCase: GetOwnUserUseCase) {}

    public async handle(req: CustomRequest, res: Response): Promise<Response> {

        try {
            
            if (!req.user) {
                return res.status(401).json({ error: "User not authenticated" });
            }
            
            const userId = req.user.id;
            if(!userId){
                throw new HttpError(401, 'User not authenticated');
            }

            const user = await this.getOwnUserUseCase.execute(userId);
            return res.status(200).json(user);
        } catch (error: any) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            } else if (error.message === 'User not found') {
                return res.status(404).json({ error: "User not found" });
            } else if (error.message === 'Invalid user ID') {
                return res.status(400).json({ error: "Invalid user ID" });
            } else {
                return res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}
