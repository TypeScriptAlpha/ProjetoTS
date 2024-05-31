import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { LoginUserUseCase } from "./loginUserUseCase";
import { LoginUserController } from "./loginUserController";

const postgresUserRepository = new PostgresUserRepository();

const loginUserUseCase = new LoginUserUseCase(postgresUserRepository);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController, loginUserUseCase }