import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { GetOwnUserUseCase } from "./GetOwnUserUseCase";
import { GetOwnUserController } from "./GetOwnUserController";

const postgressUserRepository = new PostgresUserRepository();

const getOwnUserUseCase = new GetOwnUserUseCase(postgressUserRepository);

const getOwnUserController = new GetOwnUserController(getOwnUserUseCase);

export { getOwnUserController, getOwnUserUseCase }