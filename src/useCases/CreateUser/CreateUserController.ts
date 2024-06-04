import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { HttpError } from "../../errors/HttpError";
import { UserData } from "./CreateUserDTO";
export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase){}

    public async handle(req: Request, res: Response): Promise<Response>{
        const { username, first_name, last_name, email,  password } = req.body

        try{
            const newUser:UserData = await this.createUserUseCase.execute({
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            })

            const userResponse: UserData = {
                id: newUser.id,
                username: newUser.username,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
            };
            

            return res.status(201).json({ user: userResponse });
        } catch (error) {
            if (error instanceof HttpError){
                return res.status(error.status).json({ message: error.message})
            }
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}