import { configureStore } from "@reduxjs/toolkit";
import { pagesReducer } from "./slices/pagesSlice";

export const store = configureStore({
    reducer: {
        pages: pagesReducer
    }
});