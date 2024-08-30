import type { UserModel } from "../user_model";

export type AuthView = {
    token: string;
    expiredAt: Date;
    user: UserModel;
};
