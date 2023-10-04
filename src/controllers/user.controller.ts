import {Request, Response}from "express";
import User from "../model/user.model";
import userRepository from "../repositories/user.repository";

export default class userController{

    //request to handle creating a user
    async createUser(req: Request, res: Response){
        if(!req.body){
            res.status(400).send({
                message: "Content can't be empty"
            })
        }
        try{
            const user: User = req.body;
            const newUser = await userRepository.addUser(user);
            
            res.status(201).send(newUser);
        }catch(err){
            res.status(500).send({
                message: "Error occured while adding a new user"
            })
        }
    }

    //request to handle finding a user with their name
    async findUser(req: Request, res: Response){
        const name = typeof req.params.name === "string" ? req.params.name : "";
        try{
            const user = await userRepository.retrieveUserByCondition({name: name});

            res.status(200).send(user);
        }catch(err){
            res.status(500).send({
                message: "Error occured while fetching user"
            })
        }
    }

    //request to handle listing all users
    async findAllUsers(req: Request, res: Response){
        try{
            const users = await userRepository.retrieveUserByCondition({});
            
            res.status(200).send(users);
        }catch(err){
            res.status(500).send({
                message: "Error occured while fetching users"
            })
        }
    }

    //request to handle updating a user using their ID
    async updateUserInfo(req: Request,res: Response){
        let user: User = req.body;
        user.id = parseInt(req.params.id);

        try{
            const rowsAffected = await userRepository.update(user);
            
            if(rowsAffected == 1){
                res.status(200).send({
                    message: "User was updated Successfully!"
                })
            }
            else res.status(400).send({
                message: "User wasn't updated Successfully!"
            })
        }catch(err){
            res.status(500).send({
                message: err
            })
        }
    }

    //request to handle deleting a user using their ID
    async deleteUser(req: Request, res: Response){
        const id = parseInt(req.params.id);

        try{
            const number = await userRepository.delete(id);
            if(number == 1){
                res.status(200).send({
                    message: "User was deleted successfully"
                })
            }
            else{
                res.status(400).send({
                    message: "Failed to delete user"
                })
            }
        }catch(err){
            res.status(500).send({
                message: "Some Error occured while deleting the user"
            })
        }
    }
}