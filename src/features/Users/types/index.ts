export interface User {
    userId: number;
    roleId: number;
    roleName: string;
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
}

export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
}

export interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    active: boolean;
}