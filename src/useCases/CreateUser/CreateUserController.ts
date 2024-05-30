import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { HttpError } from "../../errors/HttpError";

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase){}

    public async handle(req: Request, res: Response): Promise<Response>{
        const { username, first_name, last_name, email,  password } = req.body

        try{
            const newUser = await this.createUserUseCase.execute({
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            })

            return res.status(201).json({user: { username, email },});
        } catch (error) {
            if (error instanceof HttpError){
                return res.status(error.status).json({ message: error.message})
            }
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}