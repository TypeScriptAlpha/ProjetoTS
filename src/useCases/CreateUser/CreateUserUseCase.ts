import { Utils } from "../../utils/Utils";
import { UserValidation } from "../../Validation/UserValidation";
import { User } from "../../entities/User";
import { UserRepository } from "../../repository/UserRepository";
import { HttpError } from "../../errors/HttpError";
import { CreateUserRequestDTO } from "../../useCases/CreateUser/CreateUserDTO"
import { UserData } from "../../useCases/CreateUser/CreateUserDTO";

export class CreateUserUseCase {
    constructor(private userRepositories: UserRepository) {}

    public async execute({ username, first_name, last_name, email, password }: CreateUserRequestDTO): Promise<UserData> {
        UserValidation.usernameCheck(username);
        UserValidation.emailCheck(email);
        UserValidation.passwordCheck(password);

        const hashedPassword: string = await Utils.hashPassword(password);

        const user = new User({
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: hashedPassword
        });

        const usersData: User | undefined = await this.userRepositories.save(user);

        if (!usersData) {
            throw new HttpError(500, "Failed to save user data or user data is invalid");
        }

        const userData: UserData = {
            id: usersData.id,
            username: usersData.username || "",
            first_name: usersData.first_name || "",
            last_name: usersData.last_name || "",
            email: usersData.email || ""
        };

        return userData;
    }
}
