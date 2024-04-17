import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/services/user.service";
import { ICustomer } from "../interfaces";
import { useState } from "react";
import { GET_ANIMAL_TYPES, GET_ANIMAL_TYPE_BY_ID } from "../graphql/services/animal_type.service";
import { AuthHeader } from "../hooks/AuthHeader";
import ModalRegisterPet from "./Modals/ModalRegisterPet";
import { useDispatch } from "react-redux";
import { changeCustomerId } from "../store/slices/customer.slice";

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
                                <span className="fw-bold">{customer.name}</span>
                                <span >Nome</span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold">{customer.animals.length}</span>
                                <span>Animais</span>
                            </div>
                            <span onClick={() => setCustomerIndexToShow(checkSameIndex(index) ? -1 : index)} role="button" className="fw-semibold">{checkSameIndex(index) ? '▲' : '▼'}</span>
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
                                            <button className="btn btn-orange">Editar perfil</button>
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
                                                        <td role="button" className="text-orange fw-semibold">ver mais</td>
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