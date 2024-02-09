import {  useState } from "react";
import userService from "../../graphql/services/user.service";
import { ICustomer } from "../../interfaces";

const RegisterCustomerForm = () => {

    const [customer, setCustomer] = useState<ICustomer>();

    async function registerCustomer(e) {
        e.preventDefault()
        userService.createCustomer(customer)
        document.getElementById("close-register-modal").click();
    }

    return (
        <form onSubmit={registerCustomer} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required placeholder="Davi Speck" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Email</label>
                <input onChange={(e) => setCustomer({ ...customer, email: e.target.value })} required placeholder="davispeck@mail.com" className="border-orange form-control mw-400" type="email" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Telefone</label>
                <input maxLength={11} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} required placeholder="61 988229999" className="border-orange form-control mw-400" type="tel" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Senha</label>
                <input onChange={(e) => setCustomer({ ...customer, password: e.target.value })} required placeholder="Insira sua senha" className="border-orange form-control mw-400" type="password" />
            </div>
            {/* <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Imagem</label>
                <input onChange={(e) => setCustomer({ ...Customer, imageUrl: e.target.value })} className="border-orange form-control mw-400" type="file" />
            </div> */}
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold">Salvar</button>
            </div>
        </form>
    );
}

export default RegisterCustomerForm;