import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";
import { ListAllUsersController} from "./ListAllUsersController";

const postgresUserRepository = new PostgresUserRepository();

const listAllUserUseCase = new ListAllUsersUseCase(postgresUserRepository);

const listAllUsersController = new ListAllUsersController(listAllUserUseCase);

export { listAllUsersController, listAllUserUseCase }