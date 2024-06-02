import { Request, Response } from "express";
import { LoginUserUseCase } from "./loginUserUseCase";
import { HttpError } from "../../errors/HttpError";

export class LoginUserController {
    constructor(
        private loginUserUseCase: LoginUserUseCase
    ) {}

    public async handle(req: Request, res: Response): Promise<Response>{
        const { email, username, password } = req.body;
        let result;
        try {
            if (email || username) {
                result = await this.loginUserUseCase.execute(email ? { email, password } : { username, password });
        } else {
            throw new HttpError(400, 'Username or email is required');
        }

        res.cookie('session_id', result.sessionToken, { httpOnly: true, expires: new Date(Date.now() + 864000000) });
        return res.status(200).json({ result })

        
        } catch (error){
            if (error instanceof HttpError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
}}
// curl -X POST http://localhost:3000/login \
// -H "Content-Type: application/json" \
// -d '{
//     "email": "anita@exemplo.com",
//     "password": "Senha123"
// }'
