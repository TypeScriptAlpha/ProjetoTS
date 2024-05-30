import { HttpError } from "../errors/HttpError";

export class UserValidation {
    private constructor(){}

    public static emailCheck(email: string): void {
        const emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            throw new HttpError(400, 'Invalid Email!');
        }

        if (!email) {
            throw new HttpError(400, 'Email is required!')
        }
    }

    public static usernameCheck(name:string): void {
        const trimedName = name.trim();

        if (trimedName.length < 4){
            throw new HttpError(400, 'The name must have at least 4 characters');
        }
    }

    public static passwordCheck(password:string): void {
        const passwordRegex :RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;

        if (password.length < 8) {
            throw new HttpError(400, 'The password must have at least 8 characters');
        }

        if (!passwordRegex.test(password)){
            throw new HttpError(400, 'The password must contain at lest one uppercase letter and one number');
        }
    }
}