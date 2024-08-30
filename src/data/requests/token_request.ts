export type TokenRequest = {
    token: string;
    userUid: string;
    status: "login" | "logout";
    expiredAt: Date;
};
