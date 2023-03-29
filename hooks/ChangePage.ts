import { AdminPagesEnum } from "../dto/admin-pages.enum";
import { PagesEnum } from "../dto/pages.enum";

export const ChangePage = (page: string) => {
    switch(page){
        case PagesEnum.dashboardPage: return AdminPagesEnum.dashboardPage
        case PagesEnum.employeesPage: return AdminPagesEnum.employeesPage
        case PagesEnum.financePage: return AdminPagesEnum.financePage
        case PagesEnum.schedulePage: return AdminPagesEnum.schedulePage
        case PagesEnum.settingsPage: return AdminPagesEnum.settingsPage
    }
}