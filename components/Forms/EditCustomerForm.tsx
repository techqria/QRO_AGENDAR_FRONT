import { FormEvent, useEffect, useState } from "react";
import { UPDATE_CUSTOMER_PROFILE, GET_CUSTOMERS, GET_CUSTOMER_BY_ID } from "../../graphql/services/user.service";
import { IAdress, IAnimal, ICustomer } from "../../interfaces";
import { GenderEnum } from "../../enum/gender.enum";
import Tooltip from "../Tooltip";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_ANIMAL_TYPE, GET_ANIMAL_TYPES } from "../../graphql/services/animal_type.service";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { AuthHeader, AuthHeaderRefetch } from "../../hooks/AuthHeader";
import { ToastMessage } from "../../hooks/ToastMessage";
import { ToastEnum } from "../../enum/toast.enum";

const EditCustomerForm = () => {

    const { customerId } = useSelector((store: IStore) => store.customer);

    const [customer, setCustomer] = useState<ICustomer>();

    const [getCustomerByIdQuery] = useLazyQuery(GET_CUSTOMER_BY_ID, AuthHeader())
    const [updateCustomerMutation] = useMutation(UPDATE_CUSTOMER_PROFILE, AuthHeader())
    const [birthdate, setBirthdate] = useState<string>('');

    useEffect(() => {
        async function getUserData() {
            const { data } = await getCustomerByIdQuery({ variables: { id: customerId } })
            setCustomer(data?.getUserById)
        }

        getUserData()

    }, [customerId]);

    async function updateCustomer(e) {
        e.preventDefault()

        const cepResult = await (await fetch(process.env.NEXT_PUBLIC_CEP_API.replace("{CEP}", customer.adress.cep))).json()
        if (cepResult.message) return alert(cepResult.message)

        const { service, street, ...adressFormatted } = cepResult
        const adress: IAdress = { ...adressFormatted, additionalInfo: "" }

        const birthDateFormatted = birthdate ? `${birthdate.slice(3, 5)}/${birthdate.slice(0, 2)}/${birthdate.slice(6, birthdate.length)}` : customer.birthdate

        await updateCustomerMutation({
            variables: {
                id: customerId,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                password: customer.password,
                image_url: customer.image_url || "a",
                birthdate: birthDateFormatted,
                adress,
            },
            refetchQueries: [{ query: GET_CUSTOMERS, context: AuthHeaderRefetch() }]
        })
        document.getElementById("close-edit-customer-modal").click();
        ToastMessage(ToastEnum.success, 'Cliente atualizado com sucesso')
    }

    function formatDateInput(value: string) {
        const inputValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        const day = inputValue.slice(0, 2);
        const month = inputValue.slice(2, 4);
        const year = inputValue.slice(4, 8);
        let formattedValue = '';

        if (inputValue.length > 4) formattedValue = `${day}/${month}/${year}`;
        else if (inputValue.length > 2) formattedValue = `${day}/${month}`;
        else formattedValue = day;

        setBirthdate(formattedValue);
    }

    if(!customer) return <p>Usuário inválido</p>

    return (
        <form onSubmit={updateCustomer} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required placeholder="Davi Speck" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Telefone</label>
                <input value={customer.phone} maxLength={11} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} required placeholder="61 988229999" className="border-orange form-control mw-400" type="tel" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Email</label>
                <input value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} required placeholder="davispeck@mail.com" className="border-orange form-control mw-400" type="email" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Senha</label>
                <input onChange={(e) => setCustomer({ ...customer, password: e.target.value })} required placeholder="Insira sua senha" className="border-orange form-control mw-400" type="password" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">CEP</label>
                <input value={customer.adress.cep} onChange={(e) => setCustomer({ ...customer, adress: { ...customer.adress, cep: e.target.value } })} required placeholder="Insira seu CEP" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Data de Nascimento</label>
                <input value={new Date(customer.birthdate).toLocaleDateString("pt-BR")} onChange={(e) => formatDateInput(e.target.value)} required placeholder="Insira sua data de nascimento" className="border-orange form-control mw-400" type="text" />
            </div>

            <div className="mb-3 d-flex justify-content-center gap-3">
                <button id="close-register-customer-modal" type="button" data-bs-dismiss="modal" aria-label="Close" className=" btn btn-orange opacity-50 mt-5 rounded fw-bold">Cancelar</button>
                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold">Confirmar</button>
            </div>
        </form>
    );
}

export default EditCustomerForm;