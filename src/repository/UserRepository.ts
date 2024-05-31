import { User } from "../entities/User";

export interface UserRepository{

    getAllUsers(): Promise<User[]>
    save(user: User): Promise<User>
    getUserByEmail(email: string): Promise<User | null>
    getUserByUsername(username: string): Promise<User | null>


}