import { useMutation } from "@apollo/client";
import { useState } from "react";
import { AuthHeader, AuthHeaderRefetch } from "../../hooks/AuthHeader";
import { CREATE_SPECIALTY, GET_ALL_SPECIALTIES } from "../../graphql/services/specialty.service";

const RegisterSpecialtyForm = () => {

    const [title, setTitle] = useState<string>('');
    const [createSpecialtyMutation] = useMutation(CREATE_SPECIALTY, AuthHeader())


    async function registerSpecialty(e) {
        e.preventDefault()
        await createSpecialtyMutation({ variables: { title }, refetchQueries: [{ query: GET_ALL_SPECIALTIES, context: AuthHeaderRefetch() }] })
        document.getElementById("close-register-modal-specialty").click()
    }

    return (
        <form onSubmit={registerSpecialty} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input onChange={(e) => setTitle(e.target.value)} required placeholder="Cardiologista" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold">Salvar</button>
            </div>
        </form>
    );
}

export default RegisterSpecialtyForm;