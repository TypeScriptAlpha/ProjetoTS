import { User } from "../../entities/User";
import { UserRepository } from "../UserRepository";
import { pool } from "../../database/connection";
import { HttpError } from "../../errors/HttpError";
import { readSync } from "fs";

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
        const query: string = 'SELECT id, username, email, first_name, last_name FROM users';
        
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
        } catch (error){
            console.log('Erro requesting data: ', error);
            throw new HttpError(401, 'Error requesting data');
        } finally {
            if(client){
                client.release();
            }
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        let client: any = null;
        const query: string = 'SELECT * FROM users WHERE id = $1'

        try{
            client = await pool.connect();
            const result = await client.query(query, [id]);

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
}