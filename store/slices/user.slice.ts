import { createSlice } from "@reduxjs/toolkit";
import { UserInitialState } from "../initialState/user.state";

const userSlice = createSlice({
    name: "user",
    initialState: UserInitialState,
    reducers: {
        changeRole(state, action) {
            state.role = action.payload
        }
    }
})

export const { changeRole } = userSlice.actions
export const userReducer = userSlice.reducer