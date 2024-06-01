import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { UpdateTeamUseCase } from "./UpdateTeamUseCase";
import { UpdateTeamController } from "./UpdateTeamController";

const postgressUserRepository = new PostgresUserRepository();

const updateTeamUseCase = new UpdateTeamUseCase(postgressUserRepository);

const updateTeamController = new UpdateTeamController(updateTeamUseCase);

export { updateTeamController, updateTeamUseCase };