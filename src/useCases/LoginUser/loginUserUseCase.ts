import { UserRepository } from "../../repository/UserRepository";
import { LoginUserRequestDTO } from "./LoginUserDTO";
import { Utils } from "../../utils/Utils";
import config from "../../config/config";
import jwt from 'jsonwebtoken';
import { HttpError } from "../../errors/HttpError";

export class LoginUserUseCase {
    constructor(private userRespository: UserRepository){}

    public async execute(data: LoginUserRequestDTO){

        let userData;

        if(data.email){
            userData = await this.userRespository.getUserByEmail(data.email);
        } else if (data.username){
            userData = await this.userRespository.getUserByUsername(data.username);
        }

        if(!userData){
            throw new HttpError(404, 'User not founded');
        }

        if(!userData.password){
            throw new HttpError(404, 'User not founded');
        }

        if(!userData.id){
            throw new HttpError(404, 'User not founded');
        }

        const comparePassword = await Utils.comparePassword(data.password, userData.password)

        if(!comparePassword){
            throw new HttpError(403, 'Invalid credentials');
        }

        const leader = await this.userRespository.getLeaderByUserId(userData.id)

        const user = {
            id: userData.id,
            is_admin: userData.is_admin,
            leader: leader?.leader            
        }
        

        const sessionToken = jwt.sign(
            user,
            config.SECRET_KEY,
            { expiresIn: 864000 }
        );
        

        return {
            sessionToken: sessionToken,
            id: userData.id
        }
        
    }
}

    
