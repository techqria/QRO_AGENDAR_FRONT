import loginService from "../graphql/services/login.service";

const LoginForm = () => {

    async function callApi() {
        const data = await loginService.login("aenamartinelli@gmail.com", "123456")
        console.log(data)
    }

    return (
        <div className="mt-5 mt-md-0 pt-5 w-100 ps-md-5 pe-md-5">
            <h2 className="fw-bold text-start">Fazer login</h2>

            <div className="mt-5 mt-md-4">
                <div className="mb-3">
                    <label htmlFor="">Clínica</label>
                    <input className="input" type="text" />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input className="input" type="email" />
                </div>
                <div className="mb-5">
                    <label htmlFor="">Senha</label>
                    <input className="input" type="password" />
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