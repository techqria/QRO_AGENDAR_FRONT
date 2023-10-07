import { createSlice } from "@reduxjs/toolkit";
import { clearRedux } from "../actions/clearRedux";
import { EmployeeInitialState } from "../initialState/employee.state";

const employeeSlice = createSlice({
    name: "employee",
    initialState: EmployeeInitialState,
    reducers: {
        changeEmployee(state, action) {
            state.name = action.payload.name
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.specialty_id = action.payload.specialty_id
            state.color = action.payload.color
            state.id = action.payload.id
        },
        changeEmployeeColor(state, action) {
            state.color = action.payload
        },
        changeEmployeeName(state, action) {
            state.name = action.payload
        },
        changeEmployeeEmail(state, action) {
            state.email = action.payload
        },
        changeEmployeePhone(state, action) {
            state.phone = action.payload
        },
        changeEmployeeSpecialtyId(state, action) {
            state.specialty_id = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(clearRedux, (state) => {
            state.color = EmployeeInitialState.color
            state.email = EmployeeInitialState.email
            state.id = EmployeeInitialState.id
            state.name = EmployeeInitialState.name
            state.password = EmployeeInitialState.password
            state.phone = EmployeeInitialState.phone
            state.specialty_id = EmployeeInitialState.specialty_id
        })
    },
})

export const { changeEmployee, changeEmployeeColor, changeEmployeeName, changeEmployeeEmail, changeEmployeePhone, changeEmployeeSpecialtyId } = employeeSlice.actions
export const employeeReducer = employeeSlice.reducer