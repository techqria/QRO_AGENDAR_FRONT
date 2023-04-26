import { PagesEnum } from "../dto/pages.enum";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/types/types";
import { useEffect } from "react";
import { changePage } from "../store/slices/pagesSlice";

const SidebarDesktop = () => {

    const dispatch = useDispatch()

    const { currentPage } = useSelector((store: IStore) => store.pages);


    return (
        <div className="d-none d-md-flex bg-white sidebar-menu position-fixed h-100 p-4 flex-column justify-content-between">
            <div className="d-flex flex-column gap-5">
                <img width={30} className="mb-5" src="/favicon.svg" alt="logo-orange-qro-agendar.svg" />
                <i onClick={() => dispatch(changePage(PagesEnum.dashboardPage))} role="button" className={`${currentPage === PagesEnum.dashboardPage && 'bg-dark'} dashboard-icon`}></i>
                <i onClick={() => dispatch(changePage(PagesEnum.employeesPage))} role="button" className={`${currentPage === PagesEnum.employeesPage && 'bg-dark'} person-icon`}></i>
                <i onClick={() => dispatch(changePage(PagesEnum.schedulePage))} role="button" className={`${currentPage === PagesEnum.schedulePage && 'bg-dark'} calendar-icon`}></i>
                <i onClick={() => dispatch(changePage(PagesEnum.financePage))} role="button" className={`${currentPage === PagesEnum.financePage && 'bg-dark'} chart-icon`}></i>
            </div>

            <i onClick={() => dispatch(changePage(PagesEnum.settingsPage))} role="button" className={`${currentPage === PagesEnum.settingsPage && 'scale-01'} settings-icon`}></i>
        </div>
    );
}

export default SidebarDesktop;