import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const postgressUserRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUseCase(postgressUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase }