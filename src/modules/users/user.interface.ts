

export interface payloadForCreateUser {
    name: string;
    email: string
    password: string,
    age: number
    role ?: string
}
export interface payloadForUpdateUser {
    name: string;
    password: string;
    age: number;
    is_active: boolean;
}