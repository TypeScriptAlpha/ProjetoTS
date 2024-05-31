import { HttpError } from "../../errors/HttpError";
import { UserRepository } from "../../repository/UserRepository";
import { DeleteUserFromTeamDTO } from "./DeleteUserFromTeamDTO";

export class DeleteUserFromTeamUseCase {
    constructor (private userRepositories: UserRepository){}

    public async execute ({ user_id, team_id }: DeleteUserFromTeamDTO){
        const user = await this.userRepositories.getUserById(user_id);

        if(!user){
            throw new HttpError(404, 'User not founded');
        }

        if(user.squad !== team_id){
            throw new HttpError(412, 'User already not in squad');
        }

        const updateUser = await this.userRepositories.deleteUserFromTeam(user_id);

        return updateUser;
    }
}