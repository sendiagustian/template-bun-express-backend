import { exeQuery, getQuery } from "../app/configs/database";
import type { TokenRequest } from "./../data/requests/token_request";

export class TokenRepository {
    static async create(reqData: TokenRequest): Promise<any> {
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

    static async find(token: string): Promise<any> {
        const sql = `SELECT * FROM tbAuth WHERE token = ? limit 1`;
        const data = await getQuery({
            query: sql,
            type: "object",
            params: [token]
        });
        return data;
    }

    static async findByUserUid(userUid: string): Promise<any> {
        const sql = `SELECT * FROM tbAuth WHERE userUid = ? ORDER BY id DESC limit 1`;
        const data = await getQuery({
            query: sql,
            type: "object",
            params: [userUid]
        });
        return data;
    }

    static async delete(token: string): Promise<any> {
        const sql = `DELETE FROM tbAuth WHERE token = ?`;
        const data = await exeQuery({
            query: sql,
            params: [token]
        });
        return data;
    }
}
