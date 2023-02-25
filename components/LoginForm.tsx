const LoginForm = () => {
    return (
        <div className="mt-5 pt-5 w-100">
            <h2 className="fw-bold text-start">Fazer login</h2>

            <div className="mt-5">
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input className="input" type="text" />
                </div>
                <div className="mb-5">
                    <label htmlFor="">Senha</label>
                    <input className="input" type="password" />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <button className="btn btn-gold">ENTRAR</button>
                    <img className="img-fluid mt-4" src="/images/divider-login.svg" alt="divider-login.svg" />
                    <button className="btn btn-outline-light w-100 mt-4 ">Login com Google</button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;