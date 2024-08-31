export type AuthLoginRequest = {
    email: string;
    password: string;
};

export type AuthRegisterRequest = {
    name: string;
    email: string;
    password: string;
    phone: string;
};

export type AuthTokenRequest = {
    token: string;
    userUid: string;
    status: "login" | "logout";
    expiredAt: Date;
};
