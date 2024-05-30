import dotenv from "dotenv";
import express, { Express } from "express";
import routes from "./routes/routes";
import { pool } from "./database/connection";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(routes);

const PORT:number = Number(process.env.PORT) || 3000;

pool.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on: http://localhost:${PORT}`)
        });
    })
    .catch((e: any) => {
        if (e instanceof Error) {
            console.error("Erro connecting to database:", e.message)
        } else {
            console.error("Erro connecting to database:", e);
        }
    });