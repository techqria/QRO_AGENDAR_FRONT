import { RoleEnum } from "./dto/role.enum";

export interface IMenuOptions {
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

export interface IManager {
    name: string
    email: string
    phone: string
    password: string
}

export interface IDataCreateManager {
    manager: IManager
}

export interface IApolloCreateManager {
    data: IDataCreateManager;
    loading: boolean;
}

export interface IEmployee {
    name: string;
    email: string;
    phone: string;
    password: string;
    specialty: string;
    color: string;
    imageUrl?: string;
}

export interface ISpecialties {
    title: string;
    id: string;
    qtt_employees?: number;
}

export interface IApolloGetAllSpecialties {
    data: IDataGetAllSpecialties;
    loading: boolean;
}

export interface IDataGetAllSpecialties {
    getAllSpecialties: ISpecialties[]
}
export interface ICurrentUser {
    name: string
}