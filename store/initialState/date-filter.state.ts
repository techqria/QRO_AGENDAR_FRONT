import { IDateFilter } from "../types/types";

const currentYear = new Date().getFullYear()

export const DateFilterInitialState: IDateFilter = {
    startDate: new Date(currentYear, 0, 1),
    finalDate: new Date(currentYear, 11, 30)
}