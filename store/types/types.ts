import { SchedulePeriodicityEnum } from "../../dto/schedule-periodicity.enum"

export interface IPages {
    currentPage: string
}

export interface IStore {
    pages: IPages,
    schedule: ISchedule,
}
export interface ISchedule {
    periodicityToShow: SchedulePeriodicityEnum;
    monthDate: number;
    weekDate: number;
}