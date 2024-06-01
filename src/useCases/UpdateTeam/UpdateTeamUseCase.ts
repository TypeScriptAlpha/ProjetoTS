import { HttpError } from "../../errors/HttpError";
import { UserRepository } from "../../repository/UserRepository";
import { UpdateTeamDTO } from "./UpdateTeamDTO";

export class UpdateTeamUseCase{
    constructor(private userRepositories: UserRepository){};

    public async execute(data: UpdateTeamDTO){

        if(!data.id){
            throw new HttpError(404, 'Team not founded');
        }

        const teamData = await this.userRepositories.getTeamById(data.id);

        if(!data.is_admin && data.user_id !== teamData?.leader){
            throw new HttpError(401, 'Unauthorized: Only Leaders can change squad info')
        }

        const updateTeam = {
            id : data.id,
            name: data.name || teamData?.name,
            leader: data.leader || teamData?.leader
        }

        const result = await this.userRepositories.updateTeamById(updateTeam);

        return result;
    }
}