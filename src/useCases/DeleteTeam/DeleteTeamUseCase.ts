import { HttpError } from "../../errors/HttpError";
import { UserRepository } from "../../repository/UserRepository";
import { DeleteTeamRequestDTO } from "./DeleteTeamDTO";

export class DeleteTeamUseCase {
    constructor(private userRepositories: UserRepository){};

    public async execute({team_id}: DeleteTeamRequestDTO){
        const team = await this.userRepositories.getTeamById(team_id);

        if(!team){
            throw new HttpError(404, 'Team not founded');
        }

        const deleteTeam = await this.userRepositories.deleteTeamByTeamId(team_id);

        return team;
    }
}