import { SchedulePeriodicityEnum } from "../../enum/schedule-periodicity.enum";
import { ISchedule } from "../types/types";

export const ScheduleInitialState: ISchedule = {
    periodicityToShow: SchedulePeriodicityEnum.monthSchedule,
    monthDate: Date.now(),
    weekDate: Date.now(),
    scheduleIdToShow: ''
}