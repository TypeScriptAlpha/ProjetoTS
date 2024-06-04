import { UserRepository } from "../../repository/UserRepository";

export class ListAllTeamsUseCase {
    public constructor(
        private postgresUserRepository: UserRepository
    ) {}

    public async execute() {
        return await this.postgresUserRepository.getAllTeams();
    }
}