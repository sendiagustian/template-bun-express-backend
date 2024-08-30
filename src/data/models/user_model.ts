export type UserModel = {
    uid: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
};

export const sqlToUserModel = (data: any): UserModel => {
    return {
        uid: data.uid,
        email: data.email,
        phone: data.phone,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
};
