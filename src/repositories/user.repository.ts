import { OkPacket } from "mysql2";
import connection from "../db";
import IUser from "../model/user.model";
import { rejects } from "assert";
import { resolve } from "path";

interface IUserRepository{
    addUser(user:IUser): Promise<IUser>;
    retrieveUserByCondition(searchParams:{name: string , userId: number}): Promise<IUser[]>;
    update(user: IUser): Promise<number>; 
    delete(userId: number): Promise<number>;
}

class UserRepository implements IUserRepository{

    //Adding new user to the database
    async addUser(user: IUser): Promise<IUser>{
        return new Promise((resolve,reject) => {
            connection.query<OkPacket>(
                "INSERT INTO users (user,pass,gender,active,mail,name) VALUES (?,?,?,?,?,?)",
                [user.user,user.pass,user.gender,user.active ? user.active : false,user.mail,user.name],
                (err,res) => {
                    if(err)
                        reject(err);
                    else 
                    {
                        const Id: number = res.insertId;
                        this.retrieveUserByCondition({})
                        .then((user) => {
                            const addedUser: IUser[] = user;
                            resolve(addedUser?.[0]);
                        })
                        .catch(reject);
                    }
                }
            )
        });
    }

    //Retrieving all users or a certain user 
    async retrieveUserByCondition(searchParams: {name?: string , userId?: number}): Promise<IUser[]>{
        let query: string = "SELECT * FROM users";
        let condition: string = "";

        if(searchParams?.name)
            condition += `LOWER(name) LIKE '%${searchParams.name}'`;

        if(searchParams?.userId)
            condition += `id = ${searchParams.userId}`;

        if(condition.length)
            query += " "+ "WHERE" + " " + condition;

        return new Promise((resolve,reject) => {
            connection.query<IUser[]>(
                query,
                (err,res) => {
                    if(err) reject(err);
                    else resolve(res)
                }
            )
        })
    }

    //Updating a user using their ID
    async update(user: IUser): Promise<number>{
        return new Promise((resolve,reject) => {
            connection.query<OkPacket>(
                "UPDATE users SET user = ? ,pass = ? ,gender = ? ,active = ? ,mail = ? ,name = ? WHERE id = ?",
                [user.user,user.pass,user.gender,user.active,user.mail,user.name,user.id],
                (err,res) => {
                    if(err) reject(err);
                    else resolve(res.affectedRows);
                }

            )
        })
    }

    async delete(userId: number): Promise<number>{
        return new Promise((resolve,reject) => {
            connection.query<OkPacket>(
                "DELETE FROM users WHERE id = ?",
                [userId],
                (err,res) => {
                    if(err) reject(err);
                    else resolve(res.affectedRows);
                }
            )
        })
    }

}

export default new UserRepository();