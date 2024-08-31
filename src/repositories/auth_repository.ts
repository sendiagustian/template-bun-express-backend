import { exeQuery, getQuery } from "../app/configs/database";
import { v4 as uuid } from "uuid";
import type { AuthRegisterRequest, AuthTokenRequest } from "../data/requests/auth_request";

export class AuthRepository {
    static async register(reqData: AuthRegisterRequest): Promise<string | null> {
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

    static async findUserByEmail(email: string): Promise<string | null> {
        const sql = `SELECT * FROM tbUsers WHERE email = ?`;
        const data = await getQuery({
            query: sql,
            type: "object",
            params: [email]
        });
        return data;
    }

    static async createToken(reqData: AuthTokenRequest): Promise<any> {
        const sql = `INSERT INTO tbAuth (token, userUid, status, expiredAt) VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE token = ?, userUid =?, status = ?, expiredAt = ?`;

        const data = await exeQuery({
            query: sql,
            params: [
                reqData.token,
                reqData.userUid,
                reqData.status,
                reqData.expiredAt,
                reqData.token,
                reqData.userUid,
                reqData.status,
                reqData.expiredAt
            ]
        });

        return data;
    }

    static async findToken(token: string): Promise<any> {
        const sql = `SELECT * FROM tbAuth WHERE token = ? limit 1`;
        const data = await getQuery({
            query: sql,
            type: "object",
            params: [token]
        });
        return data;
    }

    static async findTokenByUserUid(userUid: string): Promise<any> {
        const sql = `SELECT * FROM tbAuth WHERE userUid = ? ORDER BY id DESC limit 1`;
        const data = await getQuery({
            query: sql,
            type: "object",
            params: [userUid]
        });
        return data;
    }
}
