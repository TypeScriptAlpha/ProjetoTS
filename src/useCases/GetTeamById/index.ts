import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { GetTeamUseCase } from "./GetTeamUseCase";
import { GetTeamController } from "./GetTeamController";

const postgresUserRepository = new PostgresUserRepository();

const getTeamUseCase = new GetTeamUseCase(postgresUserRepository);

const getTeamController = new GetTeamController(getTeamUseCase);

export { getTeamController, getTeamUseCase };