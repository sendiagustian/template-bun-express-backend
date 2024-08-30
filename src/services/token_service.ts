import { ThrowError } from "../app/utils/error";
import { sqlToTokenModel, type TokenModel } from "../data/models/token_model";
import { TokenRepository } from "../repositories/token_repository";

export class TokenService {
    static async findToken(token: string): Promise<TokenModel> {
        try {
            const sqlData = await TokenRepository.find(token);
            const dataModel = sqlToTokenModel(sqlData);
            return dataModel;
        } catch (error) {
            throw error;
        }
    }

    static async delete(token: string): Promise<any> {
        const data = await TokenRepository.delete(token);

        if (data.affectedRows > 0) {
            return "Delete data success";
        } else if (data.affectedRows === 0) {
            throw new ThrowError(404, "Data not found");
        } else {
            throw new ThrowError(400, "Bad Request, failed to delete data");
        }
    }
}
