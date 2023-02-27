import { createSlice } from "@reduxjs/toolkit";
import { PagesInitialState } from "../initialState/pages.state";
import { IPages } from "../types/types";

const pagesSlice = createSlice({
    name: 'pages',
    initialState: PagesInitialState,
    reducers: {
        changePage(state, action) {
            state.currentPage = action.payload
        },
    }
});

export const pagesReducer = pagesSlice.reducer;
export const { changePage } = pagesSlice.actions 