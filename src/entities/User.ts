export class User {
    
    public id?: string
    public username?: string;
    public first_name?: string;
    public last_name?: string;
    public email?: string;
    public password?: string;
    public is_admin?: boolean;
    public squad?: string | null;

    constructor(props: Partial<User>){
        this.id = props.id
        this.username = props.username;
        this.email = props.email;
        this.first_name = props.first_name;
        this.last_name = props.last_name
        this.password = props.password;
        this.is_admin = props.is_admin;
        this.squad = props.squad;
    }
}