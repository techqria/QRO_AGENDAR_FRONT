import { createSlice } from "@reduxjs/toolkit";
import { ToastInitialState } from "../initialState/toast.state";

const toastSlice = createSlice({
    name: 'toast',
    initialState: ToastInitialState,
    reducers: {
        changeVisible(state, action) {
            state.visible = action.payload
        },
        changeMessage(state, action) {
            state.message = action.payload
        },
        changeType(state, action) {
            state.type = action.payload
        },
    }
});

export const toastReducer = toastSlice.reducer;
export const { changeVisible, changeMessage, changeType} = toastSlice.actions 