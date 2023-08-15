const RegisterEmployeeForm = () => {

    async function registerEmployee(e) {
        e.preventDefault()

    }

    return (
        <form onSubmit={registerEmployee} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input required placeholder="Davi Speck" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Email</label>
                <input required placeholder="davispeck@mail.com" className="border-orange form-control mw-400" type="email" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Telefone</label>
                <input required placeholder="61 988229999" className="border-orange form-control mw-400" type="tel" pattern="[0-9]{2} [0-9]{9}"/>
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Senha</label>
                <input required placeholder="Insira sua senha" className="border-orange form-control mw-400" type="password" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Especialidade</label>
                <input required placeholder="Cardiologista" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Cor</label>
                <input required className="border-orange form-control mw-400" type="color" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Imagem</label>
                <input required className="border-orange form-control mw-400" type="file" />
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Novo Funcionário</button>
            </div>
        </form>
    );
}

export default RegisterEmployeeForm;