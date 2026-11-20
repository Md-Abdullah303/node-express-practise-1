

export interface payloadForCreateUser {
    name: string;
    email: string
    password: string,
    age: number
}
export interface payloadForUpdateUser {
    name: string;
    password: string;
    age: number;
    is_active: boolean;
}