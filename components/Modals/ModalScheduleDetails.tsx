import { useEffect, useState } from "react";
import { ISchedule, } from "../../interfaces";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

const ModalScheduleDetails = () => {

    const [schedule, setSchedule] = useState<ISchedule>();

    // const [scheduleDetails]



    function closeModal() {
        document.getElementById('close-details-schedule-modal').click()
    }


    return (
        <div className="modal fade" id="scheduleDetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            {/* <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-details-schedule-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center" >Cadastrar Nova Agenda</h1>

                        <form className="mt-3">
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Funcionário</label>
                                <input type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Especialidade</label>
                                <input type="text" defaultValue={specialties?.getAllSpecialties?.filter(el => el.id == schedule?.specialty_id)[0]?.title} className="form-control mw-400" disabled />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Data</label>
                                <input value={schedule?.date} required placeholder="12/07/2024" className="border-orange form-control mw-400" maxLength={10} minLength={10} type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Horário</label>
                                <input value={schedule?.hour} maxLength={5} minLength={5} required placeholder="10:30" className="border-orange form-control mw-400" type="text" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Cliente</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Cliente</label>
                                <select className="border-orange form-control mw-400" required >
                                    <option value="">Clique para escolher um cliente</option>
                                    {
                                        customers.getAllCustomers?.map(customer => (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Pet</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Nome</label>
                                <select className="border-orange form-control mw-400" required >
                                    {!petsList || petsList?.length == 0
                                        ? <option value="Selecione um cliente">Selecione um cliente</option>
                                        : petsList?.map(pet => (
                                            <option key={pet.name} value={pet.name}>{pet.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Raça</label>
                                <input value={schedule?.pet_breed} maxLength={5} minLength={5} required placeholder="10:30" disabled className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Genêro</label>
                                <input value={schedule?.pet_gender} maxLength={5} minLength={5} required placeholder="10:30" disabled className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Castrado?</label>
                                <input value={schedule?.pet_neutered ? 'Sim' : 'Não'} maxLength={5} minLength={5} required placeholder="10:30" disabled className="border-orange form-control mw-400" type="text" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados de pagamento</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Valor do serviço</label>
                                <input value={schedule?.payment?.price} required placeholder="R$ 150" className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Método de pagamento</label>
                                <select className="border-orange form-control mw-400" required name="" id="">
                                    <option value="">Clique para escolher um método de pagamento</option>
                                    {
                                        Object.values(paymentMethodEnum)?.map(method => (
                                            <option key={method} value={method}>{method}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Informações adicionais</h2>
                            <div className="mb-3 d-flex justify-content-center">
                                <textarea value={schedule?.text} className="border-orange form-control mw-80"></textarea>
                            </div>

                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default ModalScheduleDetails;