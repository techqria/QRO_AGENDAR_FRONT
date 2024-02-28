import { AdminPagesEnum } from "../enum/admin-pages.enum";
import { EmployeePagesEnum } from "../enum/employee-pages.enum";
import { PagesEnum } from "../enum/pages.enum";

export const ChangePage = (page: string) => {
    switch(page){
        case PagesEnum.dashboardPage: return AdminPagesEnum.dashboardPage
        case PagesEnum.employeesPage: return AdminPagesEnum.employeesPage
        case PagesEnum.financePage: return AdminPagesEnum.financePage
        case PagesEnum.schedulePage: return AdminPagesEnum.schedulePage
        case PagesEnum.settingsPage: return AdminPagesEnum.settingsPage
        case PagesEnum.employeeOwnSchedulePage: return EmployeePagesEnum.employeePage
        case PagesEnum.customerPage: return AdminPagesEnum.customerPage
    }
}