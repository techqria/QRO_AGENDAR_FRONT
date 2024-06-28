import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/services/user.service";
import { ICustomer } from "../interfaces";
import { useState } from "react";
import { GET_ANIMAL_TYPES, GET_ANIMAL_TYPE_BY_ID } from "../graphql/services/animal_type.service";
import { AuthHeader } from "../hooks/AuthHeader";
import ModalRegisterPet from "./Modals/ModalRegisterPet";
import { useDispatch } from "react-redux";
import { changeCurrentPet, changeCustomerId } from "../store/slices/customer.slice";

const CustomersList = () => {

    const dispatch = useDispatch()

    const [customerIndexToShow, setCustomerIndexToShow] = useState(-1);

    const { data, loading } = useQuery(GET_CUSTOMERS, AuthHeader())
    const { data: animalTypes, loading: loadingAnimalTypes } = useQuery(GET_ANIMAL_TYPES, AuthHeader())

    function checkSameIndex(index: number) {
        return customerIndexToShow == index
    }

    const setCurrentCustomerId = (customerId: string) => dispatch(changeCustomerId(customerId))

    if (loading || loadingAnimalTypes) return <p className="text-black">Carregando Clientes</p>
    return (
        <section className="mt-3 text-black w-100 mb-5">
            {
                data?.getAllCustomers.map((customer: ICustomer, index: number) =>
                    <div key={index}>
                        <div onClick={() => setCustomerIndexToShow(checkSameIndex(index) ? -1 : index)} role="button" key={index} className="rounded bg-white p-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold">Nome</span>
                                <span>{customer.name}</span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold">Animais</span>
                                <span>{customer.animals.length}</span>
                            </div>
                            <span onClick={() => setCustomerIndexToShow(checkSameIndex(index) ? -1 : index)} role="button" className="fw-semibold">{checkSameIndex(index)
                                ? <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.0004 1.99482e-06L1.0004 3.56843e-06C0.81816 0.000574835 0.639525 0.0508383 0.483725 0.145382C0.327925 0.239925 0.20086 0.375169 0.116206 0.536556C0.031552 0.697944 -0.00748376 0.879364 0.0032985 1.06129C0.0140808 1.24321 0.0742748 1.41875 0.177401 1.569L9.1774 14.569C9.5504 15.108 10.4484 15.108 10.8224 14.569L19.8224 1.569C19.9266 1.41906 19.9877 1.24343 19.999 1.06121C20.0104 0.878981 19.9716 0.697124 19.8869 0.535395C19.8022 0.373666 19.6747 0.238248 19.5184 0.143858C19.3621 0.0494681 19.183 -0.000286031 19.0004 1.99482e-06Z" fill="black" />
                                </svg>
                                : <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.000383333 1L0.000382547 19C0.000953789 19.1822 0.0512172 19.3609 0.145761 19.5167C0.240304 19.6725 0.375547 19.7995 0.536935 19.8842C0.698322 19.9689 0.879743 20.0079 1.06167 19.9971C1.24359 19.9863 1.41913 19.9261 1.56938 19.823L14.5694 10.823C15.1084 10.45 15.1084 9.552 14.5694 9.178L1.56938 0.178001C1.41944 0.0738258 1.24381 0.0127351 1.06159 0.00136611C0.879362 -0.0100029 0.697505 0.0287848 0.535776 0.113515C0.374047 0.198245 0.238629 0.325677 0.144239 0.481965C0.0498495 0.638253 9.53317e-05 0.817421 0.000383333 1Z" fill="black" />
                                </svg>
                            }</span>
                        </div>
                        {
                            checkSameIndex(index) &&
                            <div className="row p-3">
                                <div className="col-md-6">
                                    <div className="d-flex gap-3">
                                        <img src="" alt={`Cliente ${customer.name}`} />
                                        <div className="d-flex flex-column">
                                            <h2 className="text-orange">Cliente</h2>
                                            <h2 >{customer.name}</h2>

                                            <ul>
                                                <li><span className="fw-semibold">Telefone:&nbsp;</span>{customer.phone}</li>
                                                <li><span className="fw-semibold">E-mail:&nbsp;</span>{customer.email}</li>
                                                <li><span className="fw-semibold">Endereço:&nbsp;</span>{customer.adress.neighborhood}</li>
                                                <li><span className="fw-semibold">Data de nascimento:&nbsp;</span>{new Date(customer.birthdate).toLocaleDateString('pt-br')}</li>
                                            </ul>
                                            <button onClick={_ => setCurrentCustomerId(customer.id)} data-bs-toggle="modal" data-bs-target="#editCustomerModal" className="btn btn-orange">Editar perfil</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex flex-column">
                                    <h2 className="text-orange">Animais</h2>
                                    {
                                        customer.animals.map((animal, index) =>
                                            <div key={index} className="d-flex flex-column">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Nome</th>
                                                            <th>Tipo</th>
                                                            <th>Data da última consulta</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <td><img width={40} src={animal.avatar} alt={animal.avatar} /></td>
                                                        <td>{animal.name}</td>
                                                        <td>{animalTypes.getAllAnimalTypes.filter(el => el.id == animal.typeAnimalId)[0].name}</td>
                                                        <td></td>
                                                        <td onClick={_ => dispatch(changeCurrentPet({ ...animal, index, userId: customer.id }))} role="button" data-bs-toggle="modal" data-bs-target="#editPetModal" className="text-orange fw-semibold">ver mais</td>
                                                    </tbody>
                                                </table>

                                            </div>
                                        )
                                    }
                                    <button onClick={_ => setCurrentCustomerId(customer.id)} data-bs-toggle="modal" data-bs-target="#registerPetModal" className="btn btn-orange d-flex align-self-end align-items-center">Adicionar outro pet</button>
                                </div>
                            </div>
                        }
                    </div>
                )
            }
            <ModalRegisterPet />
        </section>
    );
}

export default CustomersList;