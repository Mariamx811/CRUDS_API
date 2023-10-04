import { Router } from "express";
import userController from "../controllers/user.controller";

class userRoutes{
    router = Router();
    controller = new userController();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        
        //Route to add new user
        this.router.post("/",this.controller.createUser);

        //Route to search for a user with their name
        this.router.get("/:name",this.controller.findUser);
        
        //Route to list all users
        this.router.get("/",this.controller.findAllUsers);

        //Route to update a certain user using their ID
        this.router.put("/:id",this.controller.updateUserInfo);

        //Route to delete a certain user uing their ID
        this.router.delete("/:id",this.controller.deleteUser);

    }
}

export default new userRoutes().router;