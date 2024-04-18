import { createSlice } from "@reduxjs/toolkit";
import { DateFilterInitialState } from "../initialState/date-filter.state";

const dateFilterSlice = createSlice({
    name: "date-filter",
    initialState: DateFilterInitialState,
    reducers: {
        changeStartDate(state, action) {
            state.startDate = action.payload
        },
        changeFinalDate(state, action) {
            state.finalDate = action.payload
        },
    }
})

export const { changeFinalDate, changeStartDate } = dateFilterSlice.actions
export const dateFilterReducer = dateFilterSlice.reducer