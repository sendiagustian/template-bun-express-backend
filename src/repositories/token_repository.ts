import { exeQuery, getQuery } from "../app/configs/database";
import type { TokenRequest } from "./../data/requests/token_request";

export class TokenRepository {
    static async create(reqData: TokenRequest): Promise<string | null> {
        const sql = `INSERT INTO tbTokens (token, expiredAt) VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE token = ?, expiredAt = ?`;

        const data = await exeQuery({
            query: sql,
            params: [reqData.token, reqData.expiredAt, reqData.token, reqData.expiredAt]
        });

        if (data.affectedRows > 0) {
            return reqData.token;
        } else {
            return null;
        }
    }

    static async find(token: string): Promise<string | null> {
        const sql = "SELECT token FROM tbTokens WHERE token = ? limit 1";

        const data = await getQuery({
            query: sql,
            type: "object",
            params: [token]
        });
        return data;
    }
}
