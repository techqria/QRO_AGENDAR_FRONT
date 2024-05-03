import { RoleEnum } from "../../enum/role.enum";
import { SchedulePeriodicityEnum } from "../../enum/schedule-periodicity.enum"
import { ToastEnum } from "../../enum/toast.enum";
import { IAnimal, IVets } from "../../interfaces";

export interface IPages {
    currentPage: string
}

export interface IStore {
    pages: IPages,
    schedule: ISchedule,
    toast: IToast,
    user: IUser,
    employee: IVets,
    specialty: ISpecialty,
    customer: ICustomer,
    dateFilter: IDateFilter
}

export interface IDateFilter{
    startDate: Date
    finalDate: Date
}

export interface ISpecialty {
    id: string
}
export interface ISchedule {
    periodicityToShow: SchedulePeriodicityEnum;
    monthDate: number;
    weekDate: number;
    scheduleIdToShow: string;
}

export interface IToast {
    visible: boolean;
    message: string;
    type: ToastEnum
}

export interface IUser {
    role: RoleEnum;
    userId: string;
    email: string;
}

export interface ICustomer {
    customerId: string;
    currentPet?: IAnimal
}