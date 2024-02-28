import { useDispatch, useSelector } from "react-redux";
import BannerTopMobile from "../components/BannerTopMobile";
import BottomMenuMobile from "../components/BottomMenuMobile";
import { IStore } from "../store/types/types";
import { ChangePage } from "../hooks/ChangePage";
import SidebarDesktop from "../components/SidebarDesktop";
import BannerTopDesktop from "../components/BannerTopDesktop";
import { useEffect } from "react";
import { changePage } from "../store/slices/pagesSlice";
import { PagesEnum } from "../enum/pages.enum";

const Employee = () => {

    const { currentPage } = useSelector((store: IStore) => store.pages);

    const dispatch = useDispatch()

    useEffect(() => {
        document.body.style.backgroundColor = '#F4F4F4'
        dispatch(changePage(PagesEnum.employeeOwnSchedulePage))
    }, []);

    const CurrentPage = ChangePage(currentPage);


    return (
        <section className="mobile-padding">
            <BannerTopMobile />
            <BannerTopDesktop />
            <SidebarDesktop />
            <div className="ps-md-5 pt-md-5">
                <CurrentPage />
            </div>
            <BottomMenuMobile />
        </section>
    );
}

export default Employee;