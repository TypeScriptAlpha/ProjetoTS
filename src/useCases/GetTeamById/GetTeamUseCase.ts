import { UserRepository } from "../../repository/UserRepository";
import { HttpError } from "../../errors/HttpError";
import { Team } from "../../entities/User";

export class GetTeamUseCase {
    constructor(private userRepository: UserRepository) {}

    public async execute(team_id: string, requester_id: string, is_admin: boolean, requester_squad_id?: string): Promise<Team> {
        const team = await this.userRepository.getSquadById(team_id);

        if (!team) {
            throw new HttpError(404, 'Team not found');
        }

        if (is_admin || requester_squad_id === team_id || (team.leader && team.leader === requester_id)) {
            return team;
        } else {
            throw new HttpError(403, 'Access denied: Only team members, leaders, or administrators can access this information');
        }
    }
}

