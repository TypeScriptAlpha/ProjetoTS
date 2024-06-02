import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { GetUserUseCase } from "./getUserUseCase";
import { GetUserController } from "./getUserController";

const postgresUserRepository = new PostgresUserRepository();

const getUserUseCase = new GetUserUseCase(postgresUserRepository);

const getUserController = new GetUserController(getUserUseCase);

export { getUserController, getUserUseCase};