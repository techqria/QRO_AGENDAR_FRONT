import { createSlice } from "@reduxjs/toolkit";
import { clearRedux } from "../actions/clearRedux";
import { CustomerInitialState } from "../initialState/customer.state";

const customerSlice = createSlice({
    name: "customer",
    initialState: CustomerInitialState,
    reducers: {
        changeCustomerId(state, action) {
            state.customerId = action.payload
        },
        changeCurrentPet(state, action) {
            state.currentPet = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(clearRedux, (state) => {
            state.customerId = CustomerInitialState.customerId
        })
    },
})

export const { changeCustomerId, changeCurrentPet } = customerSlice.actions
export const customerReducer = customerSlice.reducer