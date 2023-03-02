import { createSlice } from "@reduxjs/toolkit";
import { ScheduleInitialState } from "../initialState/schedule.state";
import { SchedulePeriodicityEnum } from "../../dto/schedule-periodicity.enum";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: ScheduleInitialState,
    reducers: {
        changeSchedule(state) {
            if (state.periodicityToShow === SchedulePeriodicityEnum.monthSchedule) {
                state.periodicityToShow = SchedulePeriodicityEnum.weekSchedule
            } else state.periodicityToShow = SchedulePeriodicityEnum.monthSchedule
        },
    }
});

export const { changeSchedule } = scheduleSlice.actions;
export const scheduleReducer = scheduleSlice.reducer;