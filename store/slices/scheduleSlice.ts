import { createSlice } from "@reduxjs/toolkit";
import { ScheduleInitialState } from "../initialState/schedule.state";
import { SchedulePeriodicityEnum } from "../../enum/schedule-periodicity.enum";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: ScheduleInitialState,
    reducers: {
        changeSchedule(state) {
            if (state.periodicityToShow === SchedulePeriodicityEnum.monthSchedule) {
                state.periodicityToShow = SchedulePeriodicityEnum.weekSchedule
            } else state.periodicityToShow = SchedulePeriodicityEnum.monthSchedule
        },
        changeMonthDate(state, action) {
            state.monthDate = action.payload
        },
        changeWeekDate(state, action) {
            state.weekDate = action.payload
        },
    }
});

export const { changeSchedule, changeMonthDate, changeWeekDate } = scheduleSlice.actions;
export const scheduleReducer = scheduleSlice.reducer;