import { PostgresUserRepository } from "../../repository/implemetations/PostgressUserRepository";
import { SetMemberUseCase } from "./setMemberUseCase";
import { SetMemberController } from "./setMemberController";

const postgressUserRepository = new PostgresUserRepository();

const setMemberUseCase = new SetMemberUseCase(postgressUserRepository);

const setMemberController = new SetMemberController(setMemberUseCase);

export { setMemberController, setMemberUseCase };
