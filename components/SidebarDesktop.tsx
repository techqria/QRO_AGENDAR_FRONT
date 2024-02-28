import { PagesEnum } from "../enum/pages.enum";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/types/types";
import { changePage } from "../store/slices/pagesSlice";
import { RoleEnum } from "../enum/role.enum";
import Tooltip from "./Tooltip";

const SidebarDesktop = () => {

    const dispatch = useDispatch()

    const { currentPage, userRole } = useSelector((store: IStore) => {
        return {
            currentPage: store.pages.currentPage,
            userRole: store.user.role
        }
    });

    function employeeSchedule() {
        userRole === RoleEnum.employee && dispatch(changePage(PagesEnum.employeeOwnSchedulePage))
    }

    function renderSidebarIcons() {
        switch (userRole) {
            case RoleEnum.admin:
                return <>
                    <Tooltip description="Dashboard" >
                        <i onClick={() => dispatch(changePage(PagesEnum.dashboardPage))} role="button" className={`${currentPage === PagesEnum.dashboardPage && 'bg-dark'} dashboard-icon`}></i>
                    </Tooltip>
                    <Tooltip description="Funcionários" >
                        <i onClick={() => dispatch(changePage(PagesEnum.employeesPage))} role="button" className={`${currentPage === PagesEnum.employeesPage && 'bg-dark'} person-icon`}></i>
                    </Tooltip>
                    <Tooltip description="Clientes" >
                        <i onClick={() => dispatch(changePage(PagesEnum.customerPage))} role="button" className={`${currentPage === PagesEnum.customerPage && 'bg-dark'} customer-icon`}></i>
                    </Tooltip>
                    <Tooltip description="Agendamentos" >
                        <i onClick={() => dispatch(changePage(PagesEnum.schedulePage))} role="button" className={`${currentPage === PagesEnum.schedulePage && 'bg-dark'} calendar-icon`}></i>
                    </Tooltip>
                    <Tooltip description="Finanças" >
                        <i onClick={() => dispatch(changePage(PagesEnum.financePage))} role="button" className={`${currentPage === PagesEnum.financePage && 'bg-dark'} chart-icon`}></i>
                    </Tooltip>
                </>
            case RoleEnum.manager: return <>
                <Tooltip description="Funcionários" >
                    <i onClick={() => dispatch(changePage(PagesEnum.employeesPage))} role="button" className={`${currentPage === PagesEnum.employeesPage && 'bg-dark'} person-icon`}></i>
                </Tooltip>
                <Tooltip description="Agendamentos" >
                    <i onClick={() => dispatch(changePage(PagesEnum.schedulePage))} role="button" className={`${currentPage === PagesEnum.schedulePage && 'bg-dark'} calendar-icon`}></i>
                </Tooltip>
            </>
        }
    }

    return (
        <div className="d-none d-md-flex bg-white sidebar-menu position-fixed h-100 p-4 flex-column justify-content-between">
            <div className="d-flex flex-column gap-5">
                <img role={userRole === RoleEnum.employee && "button"} onClick={employeeSchedule} width={30} className="mb-5" src="/favicon.svg" alt="logo-orange-qro-agendar.svg" />
                {renderSidebarIcons()}
            </div>
            <Tooltip description="Configurações" >
                <i onClick={() => dispatch(changePage(PagesEnum.settingsPage))} role="button" className={`${currentPage === PagesEnum.settingsPage && 'scale-01'} settings-icon`}></i>
            </Tooltip>
        </div>
    );
}

export default SidebarDesktop;