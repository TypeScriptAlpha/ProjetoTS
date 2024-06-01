import { Request, Response } from "express";
import { GetOwnUserUseCase } from "./GetOwnUserUseCase";
import { HttpError } from "../../errors/HttpError";
//DTO?

export class GetOwnUserController {
    constructor(private getOwnUserUseCase: GetOwnUserUseCase) {}

    public async handle(req: Request, res: Response): Promise<Response> {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        
        const userId = req.user.id;
        try {
            const user = await this.getOwnUserUseCase.execute(userId);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
// curl -X GET http://localhost:3000/users/me \
// -b "session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0Zjc0OWM3LWY3NzctNDVmNi05OWJiLTBmYzI2YTgwOTAwZCIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE3MTcyMDE4OTQsImV4cCI6MTcxODA2NTg5NH0.VhA29-4uLLA3KkcxG8f6LBt6PIG11bdqof9SGUfqNHg"
