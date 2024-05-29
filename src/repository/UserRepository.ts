import { User } from "../entities/User";

export interface UserRepository{

    getAllUsers(): Promise<User[]>
    save(user: User): Promise<void>


}