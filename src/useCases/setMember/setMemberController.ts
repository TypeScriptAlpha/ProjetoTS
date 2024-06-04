import { Request, Response } from "express";
import { SetMemberUseCase } from "./setMemberUseCase";
import { HttpError } from "../../errors/HttpError";
import { UserData } from "./setMemberDTO";

interface UserPayload {
    id: string;
    is_admin: boolean;
    leader: string;
    squad?: string; 
}


interface CustomRequest extends Request {
    user?: UserPayload; 
}

export class SetMemberController {
    constructor(private setMemberUseCase: SetMemberUseCase) {}

    public async handle(req: CustomRequest, res: Response): Promise<Response> {
        const { team_id, user_id } = req.params;
        
        try {

            const { is_admin } = req.user || { is_admin: false };
            const { leader } = req.user || { leader: '' };

            if(!is_admin && leader === ''){
                throw new HttpError(403, 'Unauthorized: Only admin our team leader can perform this action');
            }

            const user = await this.setMemberUseCase.execute({
                team_id,
                user_id
            });

            if (user) {
                const userData: UserData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    squad: team_id,
                };

                return res.status(200).json({ user: userData });
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao adicionar usuário à equipe:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
