import { configureStore } from "@reduxjs/toolkit";
import { pagesReducer } from "./slices/pagesSlice";
import { scheduleReducer } from "./slices/scheduleSlice";
import { toastReducer } from "./slices/toast.slice";

export const store = configureStore({
    reducer: {
        pages: pagesReducer,
        schedule: scheduleReducer,
        toast: toastReducer
    }
});