import { Utils } from "../../utils/Utils";
import { UserValidation } from "../../Validation/UserValidation";
import { User } from "../../entities/User";
import { UserRepository } from "../../repository/UserRepository";
import { HttpError } from "../../errors/HttpError";
import { CreateUserRequestDTO } from "../../useCases/CreateUser/CreateUserDTO"
export class CreateUserUseCase {
    constructor(private userRepositories: UserRepository){}

    public async execute(data: CreateUserRequestDTO){
        UserValidation.usernameCheck(data.username);
        UserValidation.emailCheck(data.email);
        UserValidation.passwordCheck(data.password);

        const hashedPassword: string = await Utils.hashPassword(data.password);

        const user = new User({
            username: data.username,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: hashedPassword
        })

        await this.userRepositories.save(user);

        return data;
    }
}

