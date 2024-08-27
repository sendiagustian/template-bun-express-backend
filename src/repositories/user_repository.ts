import { exeQuery } from "../app/configs/database";
import type { CreateUserRequest } from "../data/requests/user_request";
import { v4 as uuid } from "uuid";

export class UserRepository {
    static async create(reqData: CreateUserRequest): Promise<string | null> {
        const uid: string = uuid().replace(/-/g, "");

        const sql = `INSERT INTO tbUsers (uid, name, email, password, phone) VALUES (?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE uid = ?, name = ?, email = ?, password = ?, phone = ?`;

        const data = await exeQuery({
            query: sql,
            params: [
                uid,
                reqData.name,
                reqData.email,
                reqData.password,
                reqData.phone,
                uid,
                reqData.name,
                reqData.email,
                reqData.password,
                reqData.phone
            ]
        });

        if (data.affectedRows > 0) {
            return uid;
        } else {
            return null;
        }
    }
}
