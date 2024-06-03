import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { CreateTeamUseCase } from "./CreateTeamUseCase";
import { CreateTeamController } from "./CreateTeamController";

const postgressUserRepository = new PostgresUserRepository();

const createTeamUseCase = new CreateTeamUseCase(postgressUserRepository);

const createTeamController = new CreateTeamController(createTeamUseCase);

export { createTeamController, createTeamUseCase }
