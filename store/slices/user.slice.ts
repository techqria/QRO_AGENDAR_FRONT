import { createSlice } from "@reduxjs/toolkit";
import { UserInitialState } from "../initialState/user.state";
import { clearRedux } from "../actions/clearRedux";

const userSlice = createSlice({
    name: "user",
    initialState: UserInitialState,
    reducers: {
        changeRole(state, action) {
            state.role = action.payload
        },
        changeUserId(state, action) {
            state.userId = action.payload
        },
        changeUserEmail(state, action) {
            state.email = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(clearRedux, (state) => {
            state.userId = UserInitialState.userId
            state.role = UserInitialState.role
        })
    },
})

export const { changeRole, changeUserId, changeUserEmail } = userSlice.actions
export const userReducer = userSlice.reducer