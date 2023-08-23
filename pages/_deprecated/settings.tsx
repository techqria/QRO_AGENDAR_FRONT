import { useRouter } from "next/router";
import ModalChangePassword from "../../components/Modals/ModalChangePassword";
import { useEffect, useState } from "react"
import authService from "../../graphql/services/auth.service";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { ICurrentUser } from "../../interfaces";

const Settings = () => {

    const route = useRouter();

    const { userId: currentUserId } = useSelector((store: IStore) => store.user);

    const [currentUser, setCurrentUser] = useState<ICurrentUser>();

    const logout = () => {
        route.push("/login")
        window.localStorage.removeItem("token")
    };

    async function getCurrentUser() {
        console.log(currentUserId)
        console.log(await authService.getCurrentUser(currentUserId))
        setCurrentUser(await authService.getCurrentUser(currentUserId))
    }

    useEffect(() => {
        getCurrentUser()
    }, []);

    return (
        <section className='container pt-5 bg-white-sec d-flex flex-column align-items-center'>
            <h4 className="text-black mt-4 pt-5">Configurações</h4>

            <div className="d-flex flex-column flex-md-row gap-5 align-items-center">

                <div className="mt-5 d-flex flex-column align-items-center me-md-5">
                    <img className="border-orange rounded-circle" src="/images/person.png" alt="" />
                    <h3 className="text-black mt-2">{currentUser?.name}</h3>
                    <p className="text-secondary mt-1">Administrador</p>
                </div>


                <div className="mt-5 d-flex flex-column gap-2 ms-md-5">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#changePasswordModal"
                        className="btn btn-orange bg-orange text-white btn-setting d-flex gap-2 align-items-center justify-content-center rounded-pill">
                        <img src="/icons/locker.svg" alt="locker.svg" />
                        Alterar Senha
                    </button>
                    <button className="btn btn-orange text-white bg-orange btn-setting d-flex gap-2 align-items-center justify-content-center rounded-pill">
                        <img src="/icons/support.svg" alt="support.svg" />
                        Falar com suporte
                    </button>
                    <button onClick={() => logout()} className="btn btn-gold bg-gold pt-4 pb-4 btn-setting d-flex gap-2 align-items-center justify-content-center rounded-pill">
                        <img src="/icons/logout.svg" alt="support.svg" />
                        Sair
                    </button>
                </div>
            </div>

            <ModalChangePassword />
        </section>
    );
}

export default Settings;