import { useState } from "react";
import specialtyService from "../../graphql/services/specialty.service";

const RegisterSpecialtyForm = () => {

    const [title, setTitle] = useState<string>('');

    async function registerSpecialty(e) {
        e.preventDefault()
        await specialtyService.createSpecialty(title)
        document.getElementById("close-register-modal").click()
    }

    return (
        <form onSubmit={registerSpecialty} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input onChange={(e) => setTitle(e.target.value)} required placeholder="Cardiologista" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Nova Especialidade</button>
            </div>
        </form>
    );
}

export default RegisterSpecialtyForm;