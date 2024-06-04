import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { ListAllTeamsUseCase } from "./ListAllTeamsUseCase";
import { ListAllTeamsController} from "./ListAllTeamsController";

const postgresUserRepository = new PostgresUserRepository();

const listAllTeamUseCase = new ListAllTeamsUseCase(postgresUserRepository);

const listAllTeamsController = new ListAllTeamsController(listAllTeamUseCase);

export { listAllTeamsController, listAllTeamUseCase }