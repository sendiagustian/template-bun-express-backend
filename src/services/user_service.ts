import { ThrowError } from "../app/utils/error";
import { Validation } from "../app/utils/validation";
import { sqlToUserModel, type UserModel } from "../data/models/user_model";
import type { UserCreateRequest, UserUpdateRequest } from "../data/requests/user_request";
import { UserValidation } from "../data/validations/user_validation";
import { UserRepository } from "../repositories/user_repository";

export class UserService {
    static async create(reqData: UserCreateRequest): Promise<string> {
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

    static async gets(): Promise<Array<UserModel>> {
        const data = await UserRepository.gets();

        if (data instanceof Array && data.length > 0) {
            const response = data.map((item: any) => {
                return sqlToUserModel(item);
            });
            return response;
        } else if (data.length === 0) {
            return [];
        } else {
            throw new ThrowError(404, "Data not found");
        }
    }

    static async getByUid(uid: string): Promise<UserModel> {
        const data = await UserRepository.getByUid(uid);

        if (data) {
            const response = sqlToUserModel(data);
            return response;
        } else {
            throw new ThrowError(404, "Data not found");
        }
    }

    static async updateData(uid: string, reqData: UserUpdateRequest): Promise<string> {
        const requestValid = Validation.validate(UserValidation.UPDATE, reqData);
        const data = await UserRepository.updateData(uid, requestValid);

        if (data.affectedRows > 0) {
            return "Update data success";
        } else if (data.affectedRows === 0) {
            throw new ThrowError(404, "Data not found");
        } else {
            throw new ThrowError(400, "Bad Request, failed to update data");
        }
    }

    static async delete(uid: string): Promise<string> {
        const data = await UserRepository.delete(uid);

        if (data.affectedRows > 0) {
            return "Delete data success";
        } else if (data.affectedRows === 0) {
            throw new ThrowError(404, "Data not found");
        } else {
            throw new ThrowError(400, "Bad Request, failed to delete data");
        }
    }
}
