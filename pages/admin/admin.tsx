import { useSelector } from "react-redux";
import BannerTopMobile from "../../components/BannerTopMobile";
import BottomMenuMobile from "../../components/BottomMenuMobile";
import { IStore } from "../../store/types/types";
import { ChangePage } from "../../hooks/ChangePage";
import SidebarDesktop from "../../components/SidebarDesktop";
import { useEffect } from "react";
import BannerTopDesktop from "../../components/BannerTopDesktop";

const Admin = () => {

    const { currentPage } = useSelector((store: IStore) => store.pages);

    const CurrentPage = ChangePage(currentPage);

    useEffect(() => {
        document.body.style.backgroundColor = '#F4F4F4'
    }, []);

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

export default Admin;