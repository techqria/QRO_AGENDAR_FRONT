import { RoleEnum } from "./dto/role.enum";

export interface IMenuOptions{
    Component: () => JSX.Element
}

export interface ILogin {
    token: string;
    user: IUserRole;
    success: boolean;
}

export interface IUserRole {
    role: RoleEnum
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IDataLogin {
    login: ILogin
}

export interface IApolloLogin {
    data: IDataLogin;
    loading: boolean;
}

export interface IVerifyToken {
    userId: string;
    userRole: string
}

export interface IApolloVerifyToken {
    data: IDataVerifyToken;
    loading: boolean;
}

export interface IDataVerifyToken {
    verifyToken: IVerifyToken
}