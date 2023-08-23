import { useState } from "react";
import userService from "../../graphql/services/user.service";
import { IManager } from "../../interfaces";

const RegisterManagerForm = () => {

    const [manager, setManager] = useState<IManager>();

    async function registerManager(e) {
        e.preventDefault()
        userService.createManager(manager)
        document.getElementById("close-register-modal").click()
    }

    return (
        <form onSubmit={registerManager} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input onChange={(e) => setManager({...manager, name: e.target.value})} required placeholder="Alexandre Oliveira" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Email</label>
                <input onChange={(e) => setManager({...manager, email: e.target.value})} required placeholder="alexandreoliveira@gmail.com" className="border-orange form-control mw-400" type="email" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Telefone</label>
                <input onChange={(e) => setManager({...manager, phone: e.target.value})} required placeholder="61 991879919" className="border-orange form-control mw-400" type="tel" maxLength={11}/>
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Senha</label>
                <input onChange={(e) => setManager({...manager, password: e.target.value})} placeholder="Insira sua senha" required className="border-orange form-control mw-400" type="password" />
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Novo Funcionário</button>
            </div>
        </form>
    );
}

export default RegisterManagerForm;