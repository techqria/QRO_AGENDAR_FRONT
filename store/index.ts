import { configureStore } from "@reduxjs/toolkit";
import { pagesReducer } from "./slices/pagesSlice";
import { scheduleReducer } from "./slices/scheduleSlice";
import { toastReducer } from "./slices/toast.slice";
import { userReducer } from "./slices/user.slice";
import { employeeReducer } from "./slices/employee.slice";
import { specialtyReducer } from "./slices/specialty.slice";
import { customerReducer } from "./slices/customer.slice";

export const store = configureStore({
    reducer: {
        pages: pagesReducer,
        schedule: scheduleReducer,
        toast: toastReducer,
        user: userReducer,
        employee: employeeReducer,
        specialty: specialtyReducer,
        customer: customerReducer
    }
});