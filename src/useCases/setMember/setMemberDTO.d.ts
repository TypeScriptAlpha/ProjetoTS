export interface CreateUserRequestDTO{
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    squad: string,
}

export interface UserData {
    id: string | undefined,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    squad: string,
}