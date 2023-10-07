import { createSlice } from "@reduxjs/toolkit";
import { UserInitialState } from "../initialState/user.state";
import { clearRedux } from "../actions/clearRedux";

const specialtySlice = createSlice({
    name: "specialty",
    initialState: { id: "" },
    reducers: {
        changeSpecialyId(state, action) {
            state.id = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(clearRedux, (state) => {
            state.id = ""
        })
    },
})

export const { changeSpecialyId } = specialtySlice.actions
export const specialtyReducer = specialtySlice.reducer