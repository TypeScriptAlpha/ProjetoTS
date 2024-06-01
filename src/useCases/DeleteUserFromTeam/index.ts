import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { DeleteUserFromTeamUseCase } from "./DeleteUserFromTeamUseCase";
import { DeleteUserFromTeamController } from "./DeleteUserFromTeamController";

const postgresUserRepository = new PostgresUserRepository();

const deleteUserFromTeamUseCase = new DeleteUserFromTeamUseCase(postgresUserRepository);

const deleteUserFromTeamController = new DeleteUserFromTeamController(deleteUserFromTeamUseCase);

export { deleteUserFromTeamController, deleteUserFromTeamUseCase };