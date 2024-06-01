import { User } from "../entities/User";
import { Team } from "../entities/User";

export interface UserRepository{

    getAllUsers(): Promise<User[]>
    getUserByUsername(username: string): Promise<User | null>
    getUserById(id: string): Promise<User | null>
    getUserByEmail(email: string): Promise<User | null>
    getLeaderByUserId(id: string): Promise<Team | null>
    getTeamById(team_id: string): Promise<Team | null>
    save(user: User): Promise<User>
    deleteUserById(id: string): Promise<void>
    deleteUserFromTeam(user_id: string): Promise<User | null>
    deleteTeamByTeamId(team_id: string): Promise<void>

}