export type CreateUserRequest = {
    name: string;
    email: string;
    password: string;
    phone: string;
};

export type UpdateUserRequest = {
    name?: string;
    email?: string;
    phone?: string;
};
