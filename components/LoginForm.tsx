import { useState } from "react";
import { ILoginUser } from "../interfaces";
import { useRouter } from "next/router";
import { LOGIN_QUERY } from "../graphql/services/auth.service";
import { useDispatch } from "react-redux";
import { changeRole, changeUserId } from "../store/slices/user.slice";
import { useLazyQuery } from "@apollo/client";
import cookie from "js-cookie"
import { AuthHeader } from "../hooks/AuthHeader";

const LoginForm = () => {

    const router = useRouter()

    const dispatch = useDispatch()

    const [user, setUser] = useState<ILoginUser>();

    const [loginQuery] = useLazyQuery(LOGIN_QUERY);

    async function callApi() {
        const { data } = await loginQuery({ variables: { email: user.email, password: user.password } })
        
        if (data.login.success) {
            cookie.set("qro_agendar_token", data.login.token)

            dispatch(changeRole(data.login.user.role))
            dispatch(changeUserId(data.login.user.id))

            router.push(`${data.login.user.role}`)
        }
    }

    return (
        <div className="mt-5 mt-md-0 pt-5 w-100 ps-md-5 pe-md-5 text-white">
            <h2 className="fw-bold text-start">Fazer login</h2>

            <div className="mt-5 mt-md-4">
                {/* <div className="mb-3">
                    <label htmlFor="">Clínica</label>
                    <input className="input" type="text" />
                </div> */}
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input onChange={(e) => setUser({ ...user, email: e.target.value })} className="input" type="email" />
                </div>
                <div className="mb-5">
                    <label htmlFor="">Senha</label>
                    <input onChange={(e) => setUser({ ...user, password: e.target.value })} className="input" type="password" />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <button className="btn btn-gold" onClick={callApi}>ENTRAR</button>
                    <img className="img-fluid mt-4 mb-4 mt-md-3 mb-md-3" src="/images/divider-login.svg" alt="divider-login.svg" />
                    <button className="btn btn-outline-light w-100">Login com Google</button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;