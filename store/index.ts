import { configureStore } from "@reduxjs/toolkit";
import { pagesReducer } from "./slices/pagesSlice";
import { scheduleReducer } from "./slices/scheduleSlice";

export const store = configureStore({
    reducer: {
        pages: pagesReducer,
        schedule: scheduleReducer
    }
});