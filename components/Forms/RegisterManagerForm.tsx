const RegisterManagerForm = () => {

    async function registerEmployee(e) {
        e.preventDefault()

    }

    return (
        <form onSubmit={registerEmployee} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input required placeholder="Alexandre Oliveira" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Email</label>
                <input required placeholder="alexandreoliveira@gmail.com" className="border-orange form-control mw-400" type="email" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Telefone</label>
                <input required placeholder="61 991879919" className="border-orange form-control mw-400" type="tel" maxLength={12} pattern="[0-9]{2} [0-9]{9}" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Senha</label>
                <input placeholder="Insira sua senha" required className="border-orange form-control mw-400" type="password" />
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Novo Funcionário</button>
            </div>
        </form>
    );
}

export default RegisterManagerForm;