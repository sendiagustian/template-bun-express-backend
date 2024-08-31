import type { UserCreateRequest, UserUpdateRequest } from "./../data/requests/user_request";
import { exeQuery, getQuery } from "../app/configs/database";
import { v4 as uuid } from "uuid";

export class UserRepository {
    static async create(reqData: UserCreateRequest): Promise<string | null> {
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

    static async gets(): Promise<any> {
        const sql: string = `SELECT * FROM tbUsers`;
        const data: any = await getQuery({
            query: sql,
            type: "list"
        });

        return data;
    }

    static async getByUid(uid: string): Promise<any> {
        const sql: string = `SELECT * FROM tbUsers WHERE uid = ? limit 1`;
        const data: any = await getQuery({
            query: sql,
            type: "object",
            params: [uid]
        });

        return data;
    }

    static async updateData(uid: string, reqData: UserUpdateRequest): Promise<any> {
        const sql = `UPDATE tbUsers SET name = ?, email = ?, phone = ? WHERE uid = ?`;
        const data = await exeQuery({
            query: sql,
            params: [reqData.name, reqData.email, reqData.phone, uid]
        });

        return data;
    }

    static async delete(uid: string): Promise<any> {
        const sql = `DELETE FROM tbUsers WHERE uid = ?`;
        const data = await exeQuery({
            query: sql,
            params: [uid]
        });

        return data;
    }
}
