export class User {
    
    public username: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;

    constructor(props: Omit<User, "id">, id?: string){
        this.username = props.username;
        this.email = props.email;
        this.first_name = props.first_name;
        this.last_name = props.last_name
        this.password = props.password;
    }
}