import { UserRepository } from "../../repository/UserRepository";

export class GetOwnUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string) {
        return await this.userRepository.getUserById(userId);
    }
}