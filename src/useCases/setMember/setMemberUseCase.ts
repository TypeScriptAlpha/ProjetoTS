import { UserRepository } from "../../repository/UserRepository";
import { HttpError } from "../../errors/HttpError";

export class SetMemberUseCase {
    constructor(private userRepository: UserRepository) {}

    public async execute({ user_id, team_id }: { user_id: string, team_id: string }): Promise<any> {
        const user = await this.userRepository.getUserById(user_id);
     
        if (!user) {
            throw new HttpError(404, 'User not found');
        }

        const success = await this.userRepository.postTeamsMember(user_id, team_id);
        console.log("secess:", success);
        
        if (!success) {
            throw new HttpError(500, "Error adding user to squad");
        }

        return user;
    }
}
