import { HttpError } from "../../errors/HttpError";
import { UserRepository } from "../../repository/UserRepository";
import { Utils } from "../../utils/Utils";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { UserValidation } from "../../Validation/UserValidation";

export class UpdateUserUseCase {
    constructor(private userRepositories: UserRepository){};

    public async execute(user: UpdateUserDTO){

        if(!user.id){
            throw new HttpError(404, 'User not founded');
        }

        const userData = await this.userRepositories.getUserById(user.id);

        if(!userData){
            throw new HttpError(404, 'User not founded');
        }

        if(!userData.password){
            throw new HttpError(404, 'User not founded');
        }

        let password;

        if (user.password) {
            const comparePassword = await Utils.comparePassword(user.password, userData.password);

            if (!comparePassword) {
                UserValidation.passwordCheck(user.password);
                password = await Utils.hashPassword(user.password);
            } else {
                password = userData.password;
            }
        } else {
            UserValidation.passwordCheck(userData.password);
            password = userData.password;
        }

        const updateUser = {
            id: userData.id,
            username: user.username || userData.username,
            email: user.email || userData.email,
            first_name: user.first_name || userData.first_name,
            last_name: user.last_name || userData.last_name,
            password: password
        };

        if(!updateUser.username){
            throw new HttpError(406, 'No user data to update');
        }

        if(!updateUser.email){
            throw new HttpError(406, 'No user data to update');
        }
        
        UserValidation.usernameCheck(updateUser.username);
        UserValidation.emailCheck(updateUser.email);

        const result = await this.userRepositories.updateUserById(updateUser);
        
        return result;
        
    }

    public async executeAdmin(id: string){
        const userData = await this.userRepositories.getUserById(id);
        console.log(userData)
        if(userData?.squad){
            throw new HttpError(400, 'User cannot be an administrator if they are in a squad')
        }

        const result = await this.userRepositories.updateUserToAdmin(id);

        return result;
    }
}