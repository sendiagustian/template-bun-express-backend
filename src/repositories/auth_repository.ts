import { exeQuery, getQuery } from "../app/configs/database";
import { v4 as uuid } from "uuid";
import type { AuthRegisterRequest } from "../data/requests/auth_request";

export class UserRepository {
    static async create(reqData: AuthRegisterRequest): Promise<string | null> {
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

    static async findByEmail(email: string): Promise<string | null> {
        const sql = `SELECT * FROM tbUsers WHERE email = ?`;
        const data = await getQuery({
            query: sql,
            type: "object",
            params: [email]
        });
        return data;
    }
}
