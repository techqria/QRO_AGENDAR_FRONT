import { GenderEnum } from "./enum/gender.enum";
import { paymentMethodEnum } from "./enum/payment-method.enum";
import { RoleEnum } from "./enum/role.enum";

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
    id?: string
}
export interface ICustomer {
    name: string;
    email: string;
    phone: string;
    password: string;
    birthdate: Date;
    image_url?: string;
    id?: string
    adress: IAdress
    animals?: IAnimal[]
}

export interface IAdress {
    cep: string
    city: string
    state: string
    neighborhood: string
    additionalInfo: string
}
export interface IAnimal {
    index?:number
    userId: string
    name: string
    gender: string
    breed: string
    color: string
    typeAnimalId: string
    neutered: boolean
    avatar: string
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
    role?: RoleEnum
    email?: string
}

export interface IApolloGetAllVets {
    data: IDataGetAllVets;
    loading: boolean;
}

export interface IDataGetAllVets {
    getAllVets: IVets[]
}

export interface IVets {
    name: string
    email: string
    phone: string
    password?: string
    specialty_id: string
    color: string;
    id?: string
}

export interface ISchedule {
    employee_id: string;
    specialty_id: string;
    date: string;
    hour: string;
    customer_name: string;
    customer_phone: string;
    pet_name: string;
    pet_breed: string;
    pet_type: string;
    pet_gender?: string;
    pet_neutered?: boolean;
    payment: IPayment;
    text?: string
}

export interface IScheduleDetails {
    id: string
    pet_name: string
    customer_name: string
    customer_phone: string
    employee: string
    specialty: string
    date: string
    pet_breed: string
    pet_neutered: boolean
    payment: IPayment
    pet_type: string
    text: string
}

export interface IPetsList {
    name: string
    breed: string
    neutered: boolean
    gender: string
    typeAnimalId: string
}

export interface IScheduleRegister {
    employee_id: string;
    specialty_id: string;
    date: string;
    pet_name: string;
    customer_name: string;
    customer_phone: string;
    pet_breed: string;
    pet_type: string;
    payment: IPayment
}

export interface IPayment {
    price: number;
    method: paymentMethodEnum;
}

export interface IScheduleCalendar {
    specialty_name: string
    employee_name: string
    date: Date
    employee_color: string
    id: string
}

export interface IFinanceList {
    employee_id: string
    employee_name: string
    qtt_schedules: number
    revenue_generated: number
}

export interface IFinanceListByUser {
    customer_name: string;
    date: Date;
    payment: IPayment;
    pet_name: string;
    pet_type: string;
    pet_breed: string;
}

export interface IWeekScheduleHours {
    hour: string
    qtt_schedules: number
}

export interface IAnimal {
    name: string
    userId: string
    gender: string
    breed: string
    typeAnimalId: string
    neutered: boolean
    color: string
}