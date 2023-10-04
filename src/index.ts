import express,{ Application } from "express";
import Routes from "./routes";
import cors,{ CorsOptions } from "cors"; 

export default class Server{
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }
    private config(app: Application): void{
        app.use(express.json());
        const corsOptions: CorsOptions = {
            origin: "*"
            
        }

        app.use(cors());
    }

}