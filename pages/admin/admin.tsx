import { useSelector } from "react-redux";
import BannerTopMobile from "../../components/BannerTopMobile";
import BottomMenuMobile from "../../components/BottomMenuMobile";
import { IStore } from "../../store/types/types";
import { ChangePage } from "../../hooks/ChangePage";

const Admin = () => {

    const { currentPage } = useSelector((store: IStore) => store.pages);

    const CurrentPage = ChangePage(currentPage);

    return (
        <section className="bg-white-sec h-100vh">
            <BannerTopMobile />
            <CurrentPage />
            <BottomMenuMobile />
        </section>
    );
}

export default Admin;