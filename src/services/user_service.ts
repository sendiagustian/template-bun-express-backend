import { ThrowError } from "../app/utils/error";
import { Validation } from "../app/utils/validation";
import type { CreateUserRequest } from "../data/requests/user_request";
import { UserValidation } from "../data/validations/user_validation";
import { UserRepository } from "../repositories/user_repository";

export class UserService {
    static async register(reqData: CreateUserRequest): Promise<string> {
        const requestValid = Validation.validate(UserValidation.CREATE, reqData);
        requestValid.password = await Bun.password.hash(reqData.password, {
            algorithm: "bcrypt",
            cost: 10
        });

        const response = await UserRepository.create(requestValid);

        if (response !== null) {
            return response;
        } else {
            throw new ThrowError(400, "Bad request, failed to create data");
        }
    }
}
