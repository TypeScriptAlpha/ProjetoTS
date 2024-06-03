import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { GetTeamMembersUseCase } from "./GetTeamMembersUseCase";
import { GetTeamMembersController } from "./GetTeamMembersController";

const postgresUserRepository = new PostgresUserRepository();

const getTeamMembersUseCase = new GetTeamMembersUseCase(postgresUserRepository);

const getTeamMembersController = new GetTeamMembersController(getTeamMembersUseCase);

export { getTeamMembersController, getTeamMembersUseCase };