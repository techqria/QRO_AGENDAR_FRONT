import cookie from "js-cookie"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { PagesEnum } from "../enum/pages.enum";
import { changePage } from "../store/slices/pagesSlice";
import { changeUserId } from "../store/slices/user.slice";

const BannerTopDesktop = () => {

    const dispatch = useDispatch()

    const route = useRouter();

    const logout = () => {
        route.push("/login")
        cookie.remove("qro_agendar_token")
        dispatch(changePage(PagesEnum.dashboardPage))
        dispatch(changeUserId(''))
    };

    return (
        <div className="d-md-flex d-none bg-white ps-6 pe-4 py-2 z-1 justify-content-between align-items-center banner-top position-fixed w-100">
            <img width={80} src="/images/logo-orange-qro-agendar.svg" alt="logo-orange-qro-agendar.svg" />
            <div className="d-flex gap-3">
                <img width={40} height={40} className="border-orange rounded-circle" src="/images/person.png" alt="" />
                <button onClick={() => logout()} className="btn btn-default text-orange bg-beige py-2 px-3">Logoff</button>
            </div>
        </div>
    );
}

export default BannerTopDesktop;