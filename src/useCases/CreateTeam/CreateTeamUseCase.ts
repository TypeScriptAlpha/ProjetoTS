import { Team } from "../../entities/User";
import { UserRepository } from "../../repository/UserRepository";
import { HttpError } from "../../errors/HttpError";
import { CreateTeamRequestDTO } from "../../useCases/CreateTeam/CreateTeamDTO"
import { TeamData } from "./CreateTeamDTO";

export class CreateTeamUseCase {
    constructor(private teamRepositories: UserRepository) {}

    public async execute({ name, leader }: CreateTeamRequestDTO): Promise<TeamData> {

        const team = new Team({
            name: name,
            leader: leader,
        });

        const squadData: Team | undefined = await this.teamRepositories.postTeam(team);

        if (!squadData) {
            throw new HttpError(500, "Failed to save team data or team data is invalid");
        }

        const teamData: TeamData = {
            id: squadData.id,
            name: squadData.name || "",
            leader: squadData.leader || "",
        };

        return teamData;
    }
}
