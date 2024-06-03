import { Team, User } from "../../entities/User";
import { UserRepository } from "../UserRepository";
import { pool } from "../../database/connection";
import { HttpError } from "../../errors/HttpError";

export class PostgresUserRepository implements UserRepository {
    constructor (){}

    public async save(user: User): Promise<User>{
        let client:any = null;
        const query: string = 'INSERT INTO users (username, email, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, first_name, last_name';

        try{
            client = await pool.connect();
            await client.query('BEGIN');
            const result = await client.query(query, [user.username, user.email, user.first_name, user.last_name, user.password]);
            await client.query('COMMIT');
            console.log('Data entered successfully');

            if (result.rowCount > 0 && result.rows[0]){
                return result.rows[0]
            }

            return result;
        } catch (error: any){
            console.error('Error inserting data', error);
            await client.query('ROLLBACK');
            throw new HttpError(500, 'Error inserting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async getAllUsers(): Promise<User[]> {
        let client:any = null;
        const query: string = 'SELECT id, username, email, first_name, last_name, squad FROM users';
        
        try {
            client = await pool.connect();
            const result = await client.query(query);
            return result.rows;
        } catch (error: any){
            console.log('Erro requesting data: ', error);
            throw new HttpError(500, 'Error requesting data');
        } finally {
            if(client){
                client.release()
            }
        }
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        let client:any = null;
        const query: string = 'SELECT * FROM users WHERE email = $1';

        try{
            client = await pool.connect();
            const result = await client.query(query, [email]);

            if(result.rows.length > 0){
                return result.rows[0]
            } else {
                return null;
            }
        } catch (error){
            console.log('Erro requesting data: ', error);
            throw new HttpError(401, 'Error requesting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async getUserByUsername(username: string): Promise<User | null>{
        let client: any = null;
        const query: string = 'SELECT * FROM users WHERE username = $1'

        try{
            client = await pool.connect();
            const result = await client.query(query, [username]);

            if(result.rows.length > 0){
                return result.rows[0]
            } else {
                return null;
            }
        } catch (error: any){
            console.log('Erro requesting data: ', error);
            throw new HttpError(401, 'Error requesting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async deleteUserById(id: string): Promise<void> {
        let client: any = null;
        const query: string = 'DELETE FROM users WHERE id = $1';

        try{
            client = await pool.connect();
            await client.query('BEGIN');
            const result = await client.query(query, [id]);
            await client.query('COMMIT');
            console.log('User deleted successfully');

            return;
        } catch (error: any){
            console.error('Error deleting user', error);
            await client.query('ROLLBACK');
            throw new HttpError(500, 'Error deleting user');
        } finally {
            if(client){
                client.release()
            }
        }
    }

    public async getUserById(id: string): Promise<User | null>{
        let client: any = null;
        const query: string = 'SELECT * FROM users WHERE id = $1';

        try{
            client = await pool.connect();
            const result = await client.query(query, [id]);
            if(result.rows.length > 0){
                return result.rows[0]
            } 

            return null;      
        } catch(error: any){
            console.log('Erro requesting data: ', error);
            throw new HttpError(401, 'Error requesting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async deleteUserFromTeam(user_id: string): Promise<User | null> {
        let client: any = null;

        const query: string = "UPDATE users SET squad = NULL WHERE id = $1 RETURNING id, username, email, first_name, last_name, squad";

        try {
            client = await pool.connect();
            await pool.query('BEGIN');
            const result = await client.query(query, [user_id]);
            await pool.query('COMMIT');
            console.log('User has been removed from squad');

            if(result.rows.length > 0){
                return result.rows[0]
            } 

            return null;

        } catch(error){
            console.log('Error removing user from squad: ', error);
            throw new HttpError(417, 'Error removing user from squad');
        } finally{
            if(client){
                client.release();
            }
        }
    }

    public async getTeamById(team_id: string): Promise<Team | null> {
        let client: any = null;

        const query: string = 'SELECT * FROM squads WHERE id = $1';

        try{
            client = await pool.connect();
            const result = await client.query(query, [team_id]);

            if(result.rows.length > 0){
                return result.rows[0]
            } 

            return null;

        } catch(error: any){
            console.log('Error requesting data: ', error);
            throw new HttpError(401, 'Error requesting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async deleteTeamByTeamId(team_id: string): Promise<void> {
        let client: any = null;

        const query: string = 'DELETE FROM squads WHERE id = $1'

        try{
            client = await pool.connect();
            await client.query('BEGIN');
            const result = await client.query(query, [team_id]);
            await client.query('COMMIT');
            console.log('Team deleted successfully');
            
            return;
        } catch(error: any){
            console.error('Erro deleting team: ', error);
            await client.query('ROLLBACK');
            throw new HttpError(500, 'Error deleting user');
        } finally {
            if(client){
                client.release();
            }
        }
    }
    
    public async getLeaderByUserId(id: string): Promise<Team | null> {
        let client: any = null;

        const query: string = 'SELECT * FROM squads WHERE leader = $1';

        try{
            client = await pool.connect();
            const result = await client.query(query, [id]);
            if(result.rows.length > 0){
                return result.rows[0]
            } 
            return null;
        } catch(error:any){
            console.log('Erro requesting data: ', error);
            throw new HttpError(401, 'Error requesting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async updateUserById(user: User): Promise<User | null> {
        let client: any = null;

        const query: string = 'UPDATE users SET username = $1, email = $2, first_name = $3, last_name = $4, password = $5 WHERE id = $6 RETURNING id, username, email, first_name, last_name';

        try{
            client = await pool.connect();
            await client.query('BEGIN');
            const result = await client.query(query, [user.username, user.email, user.first_name, user.last_name, user.password, user.id]);
            await client.query('COMMIT');

            if(result.rows.length > 0){
                return result.rows[0]
            } 
            return null;
        } catch(error: any){
            console.log('Error updating data: ', error);
            throw new HttpError(417, "Error updating data");
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async updateTeamById(team: Team): Promise<Team | null> {
        let client: any = null;

        const query: string = 'UPDATE squads SET name = $1, leader = $2 WHERE id = $3 RETURNING id, name, leader';

        try {
            client = await pool.connect();
            await client.query('BEGIN'); 
            
            const result = await client.query(query, [team.name, team.leader, team.id]);
            const updatedTeam = result.rows[0]; 

            await client.query('COMMIT'); 

            return updatedTeam || null; 
        } catch (error: any) {
            await client.query('ROLLBACK'); 
            console.error('Error updating data:', error);
            throw new HttpError(500, 'Error updating data');
        } finally {
            if (client) {
                client.release();
            }
        }
    }

    public async getUser(id: string): Promise<User | null> {
        let client: any = null;

        const query: string = 'SELECT id, username, email, first_name, last_name, squad, is_admin FROM users WHERE id = $1';
    
        try {
            client = await pool.connect();
            await client.query('BEGIN');
    
            const result = await client.query(query, [id]);
            const user = result.rows[0];
    
            await client.query('COMMIT');
            return user || null;
        } catch (error: any) {
            await client.query('ROLLBACK');
            console.error('Error fetching user:', error);
            throw new HttpError(500, 'Error fetching user');
        } finally {
            if (client) {
                client.release();
            }
        }
    }

    public async getSquadById(id: string ): Promise<Team | null> {
        let client: any = null;

        const query: string = 'SELECT name, leader FROM squads WHERE id = $1';

        try{
            client = await pool.connect();
            const result = await client.query(query, [id]);

            if(result.rows.length > 0){
                return result.rows[0]
            } 

            return null;

        } catch(error: any){
            console.log('Error requesting data: ', error);
            throw new HttpError(401, 'Error requesting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async findMembersByTeamId(team_id: string): Promise<User[]> {
        let client: any = null;
        const query: string = 'SELECT * FROM users WHERE squad = $1';
    
        try {
            client = await pool.connect();
            const result = await client.query(query, [team_id]);
            if (result.rows.length > 0) {
                return result.rows.map((row: User) => new User(row));
            } else {
                return [];
            }
        } catch (error: any) {
            console.error('Error requesting data: ', error);
            throw new HttpError(500, 'Error requesting data');
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    
}