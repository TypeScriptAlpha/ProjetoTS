import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UpdateUserController } from "./UpdateUserController";

const postgresUserRepository = new PostgresUserRepository();

const updateUserUseCase = new UpdateUserUseCase(postgresUserRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController, updateUserUseCase };