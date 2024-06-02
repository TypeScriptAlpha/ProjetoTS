import { UserRepository } from "../../repository/UserRepository";
import { HttpError } from "../../errors/HttpError";
import { User } from "../../entities/User";

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    public async execute(user_id: string, requester_id: string, is_admin: boolean, requester_leader_id?: string): Promise<User> {
        const user = await this.userRepository.getUserById(user_id);

        if (!user) {
            throw new HttpError(404, 'User not found');
        }

        if (is_admin || requester_leader_id) {
            return user;
        } else {
            throw new HttpError(403, 'Access denied: Only leaders can access this information');
        }
    }
}
