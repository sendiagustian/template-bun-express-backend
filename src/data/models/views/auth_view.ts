import type { UserModel } from "../user_model";

export type AuthView = {
    token: string;
    expiredAt: string;
    user: UserModel;
};
