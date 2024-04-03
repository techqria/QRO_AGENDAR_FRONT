import { RoleEnum } from "../../enum/role.enum";
import { SchedulePeriodicityEnum } from "../../enum/schedule-periodicity.enum"
import { ToastEnum } from "../../enum/toast.enum";
import { IVets } from "../../interfaces";

export interface IPages {
    currentPage: string
}

export interface IStore {
    pages: IPages,
    schedule: ISchedule,
    toast: IToast,
    user: IUser,
    employee: IVets,
    specialty: ISpecialty
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
}