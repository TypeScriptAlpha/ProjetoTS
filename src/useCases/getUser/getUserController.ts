import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpError";
import { GetUserUseCase } from "./getUserUseCase";

interface UserPayload {
    id: string;
    is_admin: boolean;
    leader: string;
    squad?: string; 
}


interface CustomRequest extends Request {
    user?: UserPayload; 
}
export class GetUserController {
    constructor(private getUserUseCase: GetUserUseCase) {}

    public async handle(req: CustomRequest, res: Response): Promise<Response> {
        const { user_id } = req.params;
        const requester_id = req.user?.id || '';
        const is_admin = req.user?.is_admin || false;
        const requester_leader_id = req.user?.leader || '' ;

        try {
            const user = await this.getUserUseCase.execute(user_id, requester_id, is_admin, requester_leader_id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json(user);
        } catch (error: any) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            } else if (error.message === 'Permission denied') {
                return res.status(403).json({ error: "Permission denied" });
            } else if (error.message === 'Invalid user ID') {
                return res.status(400).json({ error: "Invalid user ID" });
            } else {
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
