import { useRouter } from "next/router";
import ModalChangePassword from "../../components/Modals/ModalChangePassword";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { ICurrentUser } from "../../interfaces";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../graphql/services/user.service";
import { changeUserId } from "../../store/slices/user.slice";
import cookie from "js-cookie"
import { AuthHeader } from "../../hooks/AuthHeader";

const Settings = () => {

    const dispatch = useDispatch()

    const route = useRouter();

    const { userId: currentUserId } = useSelector((store: IStore) => store.user);

    const [currentUser, setCurrentUser] = useState<ICurrentUser>();

    const [getUserByIdQuery, { loading, data }] = useLazyQuery(GET_USER_BY_ID, AuthHeader())

    const logout = () => {
        route.push("/login")
        cookie.remove("token")

        dispatch(changeUserId(''))
    };

    async function getCurrentUser() {
        console.log(await getUserByIdQuery({ variables: { id: currentUserId } }))
        setCurrentUser((await getUserByIdQuery({ variables: { id: currentUserId } })).data.getUserById)
    }

    useEffect(() => {
        getCurrentUser()
    }, []);

    if (loading || !data) return <p>Carregando dados do usuário </p>

    return (
        <section className='container pt-5 bg-white-sec d-flex flex-column align-items-center'>
            <h4 className="text-black mt-4 pt-5">Configurações</h4>

            <div className="d-flex flex-column flex-md-row gap-5 align-items-center">

                <div className="mt-5 d-flex flex-column align-items-center me-md-5">
                    <img className="border-orange rounded-circle" src="/images/person.png" alt="" />
                    <h3 className="text-black mt-2">{currentUser.name}</h3>
                    <p className="text-secondary mt-1">{currentUser.role}</p>
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

            <ModalChangePassword email={currentUser.email} />
        </section>
    );
}

export default Settings;