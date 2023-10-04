import { RowDataPacket } from "mysql2";

export default interface IUser extends RowDataPacket{
    id?: number,
    user: string,
    pass: string,
    gender: string,
    active: boolean,
    mail: string,
    name: string 
}