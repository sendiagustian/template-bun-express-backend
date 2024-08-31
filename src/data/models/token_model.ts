export type AuthTokenModel = {
    token: string;
    userUid: string;
    expiredAt: Date | null;
    status: "login" | "logout";
    createdAt: Date;
    updatedAt: Date;
};

export const sqlToAuthTokenModel = (sql: any): AuthTokenModel => {
    return {
        token: sql.token,
        userUid: sql.userUid,
        expiredAt: sql.expiredAt,
        status: sql.status,
        createdAt: sql.createdAt,
        updatedAt: sql.updatedAt
    };
};

export const isExpiredAuthToken = (expiredAt: Date): boolean => {
    return new Date() > expiredAt;
};
