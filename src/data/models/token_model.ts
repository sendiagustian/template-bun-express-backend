export type TokenModel = {
    token: string;
    userUid: string;
    expiredAt: Date | null;
    status: "login" | "logout";
    createdAt: Date;
    updatedAt: Date;
};

export const sqlToTokenModel = (sql: any): TokenModel => {
    return {
        token: sql.token,
        userUid: sql.userUid,
        expiredAt: sql.expiredAt,
        status: sql.status,
        createdAt: sql.createdAt,
        updatedAt: sql.updatedAt
    };
};

export const isExpiredToken = (expiredAt: Date): boolean => {
    return new Date() > expiredAt;
};
