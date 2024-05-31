import { HttpError } from "../../errors/HttpError";
import { UserRepository } from "../../repository/UserRepository";
import { DeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase {
    constructor(private userRepositories: UserRepository){};

    public async execute(data: DeleteUserRequestDTO){
        const id = data.id;

        const user = await this.userRepositories.getUserById(id);

        if(!user){
            throw new HttpError(404, 'User not founded');
        }

        await this.userRepositories.deleteUserById(id);

        return user;
        
    }
}