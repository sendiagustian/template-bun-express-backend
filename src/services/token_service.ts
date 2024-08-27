import { TokenRepository } from "../repositories/token_repository";

export class TokenService {
    static async findToken(token: string): Promise<boolean> {
        try {
            const response = await TokenRepository.find(token);
            if (response) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }
}
