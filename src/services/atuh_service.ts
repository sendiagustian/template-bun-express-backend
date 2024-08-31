import jwt from "jsonwebtoken";
import { ThrowError } from "../app/utils/error";
import { Validation } from "../app/utils/validation";
import type { AuthView } from "../data/models/views/auth_view";
import type { AuthLoginRequest, AuthRegisterRequest } from "../data/requests/auth_request";
import { AuthValidation } from "../data/validations/auth_validation";
import { AuthRepository } from "../repositories/auth_repository";
import { sqlToUserModel, type UserModel } from "../data/models/user_model";
import { isExpiredAuthToken, sqlToAuthTokenModel, type AuthTokenModel } from "../data/models/token_model";

const createToken = (userModelData: UserModel): AuthView => {
    const secret: string = process.env.JWT_SECRET!;
    // Create new token
    const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const token = jwt.sign(userModelData, secret, { expiresIn: "1d" });

    // Save token to database
    AuthRepository.createToken({
        token: token,
        userUid: userModelData.uid,
        status: "login",
        expiredAt: expiredAt
    });

    return {
        token: token,
        expiredAt: expiredAt,
        user: userModelData
    };
};

export class AuthService {
    static async findToken(token: string): Promise<AuthTokenModel | null> {
        const sqlData = await AuthRepository.findToken(token);
        if (sqlData) {
            const dataModel = sqlToAuthTokenModel(sqlData);
            return dataModel;
        } else {
            return null;
        }
    }

    static async register(reqData: AuthRegisterRequest): Promise<string> {
        const requestValid = Validation.validate(AuthValidation.REGISTER, reqData);
        requestValid.password = await Bun.password.hash(reqData.password, {
            algorithm: "bcrypt",
            cost: 10
        });

        const response = await AuthRepository.register(requestValid);

        if (response !== null) {
            return response;
        } else {
            throw new ThrowError(400, "Bad request, failed to create data");
        }
    }

    static async login(reqData: AuthLoginRequest): Promise<AuthView> {
        const requestValid: AuthLoginRequest = Validation.validate(AuthValidation.LOGIN, reqData);
        const sqlUserData: any = await AuthRepository.findUserByEmail(requestValid.email);

        if (sqlUserData) {
            const userModelData: UserModel = sqlToUserModel(sqlUserData);

            const passwordValid: boolean = await Bun.password.verify(
                requestValid.password,
                sqlUserData.password,
                "bcrypt"
            );

            if (passwordValid) {
                const sqlOldAuthTokenData: any = await AuthRepository.findTokenByUserUid(userModelData.uid);

                if (sqlOldAuthTokenData) {
                    const oldTokenIsActive: boolean = sqlOldAuthTokenData.expiredAt
                        ? !isExpiredAuthToken(sqlOldAuthTokenData.expiredAt)
                        : false;

                    if (oldTokenIsActive) {
                        const oldAuthTokenModelData = sqlToAuthTokenModel(sqlOldAuthTokenData);

                        return {
                            token: oldAuthTokenModelData.token,
                            expiredAt: oldAuthTokenModelData.expiredAt!,
                            user: userModelData
                        };
                    } else {
                        return createToken(userModelData);
                    }
                } else {
                    return createToken(userModelData);
                }
            } else {
                throw new ThrowError(400, "Password or email is incorrect");
            }
        } else {
            throw new ThrowError(400, "Bad request, failed to login");
        }
    }
}
