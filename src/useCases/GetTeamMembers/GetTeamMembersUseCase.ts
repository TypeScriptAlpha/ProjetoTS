import { UserRepository } from "../../repository/UserRepository";
import { HttpError } from "../../errors/HttpError";
import { User } from "../../entities/User";

export class GetTeamMembersUseCase {
    constructor(private userRepository: UserRepository) {}

    public async execute(team_id: string): Promise<User[]> {
        try {
            return this.userRepository.findMembersByTeamId(team_id);
        } catch {
            throw new HttpError(403, 'Access denied: Only team members, leaders, or administrators can access this information');
        }

    }
}
