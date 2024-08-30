import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import { ThrowError } from "../app/utils/error";
import { Validation } from "../app/utils/validation";
import type { AuthView } from "../data/models/views/auth_view";
import type { AuthLoginRequest, AuthRegisterRequest } from "../data/requests/auth_request";
import { AuthValidation } from "../data/validations/auth_validation";
import { UserRepository } from "../repositories/auth_repository";
import { sqlToUserModel, type UserModel } from "../data/models/user_model";
import { TokenRepository } from "../repositories/token_repository";
import { sqlToTokenModel } from "../data/models/token_model";

const createToken = (userModelData: UserModel): AuthView => {
    const secret: string = process.env.JWT_SECRET!;
    // Create new token
    const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const token = jwt.sign(userModelData, secret, { expiresIn: "1d" });

    // Save token to database
    TokenRepository.create({
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
    static async register(reqData: AuthRegisterRequest): Promise<string> {
        const requestValid = Validation.validate(AuthValidation.REGISTER, reqData);
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

    static async login(reqData: AuthLoginRequest): Promise<AuthView> {
        const requestValid: AuthLoginRequest = Validation.validate(AuthValidation.LOGIN, reqData);
        const sqlUserData: any = await UserRepository.findByEmail(requestValid.email);

        if (sqlUserData) {
            const userModelData = sqlToUserModel(sqlUserData);

            const passwordValid: boolean = await Bun.password.verify(
                requestValid.password,
                sqlUserData.password,
                "bcrypt"
            );

            if (passwordValid) {
                const sqlOldTokenData = await TokenRepository.findByUserUid(userModelData.uid);

                if (sqlOldTokenData) {
                    const oldTokenIsActive = sqlOldTokenData.expiredAt
                        ? moment(sqlOldTokenData.expiredAt).isAfter(moment())
                        : false;

                    if (oldTokenIsActive) {
                        const oldTokenModelData = sqlToTokenModel(sqlOldTokenData);

                        return {
                            token: oldTokenModelData.token,
                            expiredAt: oldTokenModelData.expiredAt!,
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
