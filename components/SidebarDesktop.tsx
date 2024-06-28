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
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <i onClick={() => dispatch(changePage(PagesEnum.dashboardPage))} role="button" className={`${currentPage === PagesEnum.dashboardPage && 'bg-dark'} dashboard-icon`}></i>
                        <p className={`mb-0 fs-12 ${currentPage === PagesEnum.dashboardPage && 'fw-semibold'}`}>Dashboard</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <i onClick={() => dispatch(changePage(PagesEnum.employeesPage))} role="button" className={`${currentPage === PagesEnum.employeesPage && 'bg-dark'} person-icon`}></i>
                        <p className={`mb-0 fs-12 ${currentPage === PagesEnum.employeesPage && 'fw-semibold'}`}>Funcionários</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <i onClick={() => dispatch(changePage(PagesEnum.customerPage))} role="button" className={`${currentPage === PagesEnum.customerPage && 'bg-dark'} customer-icon`}></i>
                        <p className={`mb-0 fs-12 ${currentPage === PagesEnum.customerPage && 'fw-semibold'}`}>Clientes</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <i onClick={() => dispatch(changePage(PagesEnum.schedulePage))} role="button" className={`${currentPage === PagesEnum.schedulePage && 'bg-dark'} calendar-icon`}></i>
                        <p className={`mb-0 fs-12 ${currentPage === PagesEnum.schedulePage && 'fw-semibold'}`}>Agendamentos</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <i onClick={() => dispatch(changePage(PagesEnum.financePage))} role="button" className={`${currentPage === PagesEnum.financePage && 'bg-dark'} chart-icon`}></i>
                        <p className={`mb-0 fs-12 ${currentPage === PagesEnum.financePage && 'fw-semibold'}`}>Finanças</p>
                    </div>
                </>
            case RoleEnum.manager: return <>
                <div className="d-flex flex-column justify-content-center align-items-center"  >
                    <i onClick={() => dispatch(changePage(PagesEnum.employeesPage))} role="button" className={`${currentPage === PagesEnum.employeesPage && 'bg-dark'} person-icon`}></i>
                    <p className={`mb-0 fs-12 ${currentPage === PagesEnum.employeesPage && 'fw-semibold'}`}>Funcionários</p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center"  >
                    <i onClick={() => dispatch(changePage(PagesEnum.schedulePage))} role="button" className={`${currentPage === PagesEnum.schedulePage && 'bg-dark'} calendar-icon`}></i>
                    <p className={`mb-0 fs-12 ${currentPage === PagesEnum.schedulePage && 'fw-semibold'}`}>Agendamentos</p>
                </div>
            </>
        }
    }

    return (
        <div className="d-none d-md-flex bg-white sidebar-menu position-fixed h-100 px-2 pb-4 flex-column justify-content-between">
            <div className="d-flex flex-column gap-5">
                <img role={userRole == RoleEnum.employee ? "button" : undefined} onClick={employeeSchedule} width={30} className="mb-5" src="/favicon.svg" alt="logo-orange-qro-agendar.svg" />
                {renderSidebarIcons()}
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <i onClick={() => dispatch(changePage(PagesEnum.settingsPage))} role="button" className={`${currentPage === PagesEnum.settingsPage && 'scale-01'} settings-icon`}></i>
                <p className={`mb-0 fs-12 ${currentPage === PagesEnum.settingsPage && 'fw-semibold'}`}>Configurações</p>
            </div>
        </div>
    );
}

export default SidebarDesktop;