import { RoleEnum } from "../../dto/role.enum";
import { SchedulePeriodicityEnum } from "../../dto/schedule-periodicity.enum"
import { ToastEnum } from "../../dto/toast.enum";

export interface IPages {
    currentPage: string
}

export interface IStore {
    pages: IPages,
    schedule: ISchedule,
    toast: IToast,
    user: IUser
}
export interface ISchedule {
    periodicityToShow: SchedulePeriodicityEnum;
    monthDate: number;
    weekDate: number;
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