export type UserResponse = {
    id: string;
    name: string;
}

export type LoginResponse = {
    user: UserResponse;
    token: string;
};