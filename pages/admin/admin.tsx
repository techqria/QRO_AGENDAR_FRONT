import BannerTopMobile from "../../components/BannerTopMobile";
import BottomMenuMobile from "../../components/BottomMenuMobile";
import { AdminPagesEnum } from "../../dto/admin-pages.enum";

const Admin = () => {

    const CurrentPage = AdminPagesEnum.dashboardPage;

    return (
        <section className="bg-white-sec h-100vh">
            <BannerTopMobile />
            <CurrentPage />
            <BottomMenuMobile />
        </section>
    );
}

export default Admin;