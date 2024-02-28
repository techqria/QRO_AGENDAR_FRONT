import { PagesEnum } from "../enum/pages.enum";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/types/types";
import { changePage } from "../store/slices/pagesSlice";

const BottomMenuMobile = () => {

    const dispatch = useDispatch()

    const { currentPage } = useSelector((store: IStore) => store.pages);

    return (
        <div className="d-md-none bg-white pt-3 pb-3 d-flex justify-content-around bottom-menu position-fixed w-100">
            <img src="/favicon.svg" alt="logo-orange-qro-agendar.svg" />
            <i onClick={() => dispatch(changePage(PagesEnum.dashboardPage))} role="button" className={`${currentPage === PagesEnum.dashboardPage && 'bg-dark'} dashboard-icon`}></i>
            <i onClick={() => dispatch(changePage(PagesEnum.employeesPage))} role="button" className={`${currentPage === PagesEnum.employeesPage && 'bg-dark'} person-icon`}></i>
            <i onClick={() => dispatch(changePage(PagesEnum.schedulePage))} role="button" className={`${currentPage === PagesEnum.schedulePage && 'bg-dark'} calendar-icon`}></i>
            <i onClick={() => dispatch(changePage(PagesEnum.financePage))} role="button" className={`${currentPage === PagesEnum.financePage && 'bg-dark'} chart-icon`}></i>
            <i onClick={() => dispatch(changePage(PagesEnum.settingsPage))} role="button" className={`${currentPage === PagesEnum.settingsPage && 'scale-01'} settings-icon`}></i>
        </div>
    );
}

export default BottomMenuMobile;