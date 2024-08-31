export type UserCreateRequest = {
    name: string;
    email: string;
    password: string;
    phone: string;
};

export type UserUpdateRequest = {
    name?: string;
    email?: string;
    phone?: string;
};
