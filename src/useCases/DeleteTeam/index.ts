import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { DeleteTeamUseCase } from "./DeleteTeamUseCase";
import { DeleteTeamController } from "./DeleteTeamController";

const postgresUserRepository = new PostgresUserRepository();

const deleteTeamUseCase = new DeleteTeamUseCase(postgresUserRepository);

const deleteTeamController = new DeleteTeamController(deleteTeamUseCase);

export { deleteTeamController, deleteTeamUseCase };