import { UserRepository } from "../../repository/UserRepository";

export class ListAllUsersUseCase {
    public constructor(
        private postgresUserRepository: UserRepository
    ) {}

    public async execute() {
        return await this.postgresUserRepository.getAllUsers();
    }
}