import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_SCHEDULE_DETAIL_BY_ID } from "../../graphql/services/schedule.service";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { IScheduleDetails } from "../../interfaces";

const ModalScheduleDetails = () => {

    const { scheduleIdToShow } = useSelector((store: IStore) => store.schedule)

    const [scheduleDetails, setScheduleDetails] = useState<IScheduleDetails>();

    const [scheduleDetailsQuery, { loading }] = useLazyQuery(GET_SCHEDULE_DETAIL_BY_ID)

    useEffect(() => {
        scheduleIdToShow != '' && getScheduleDetails()
    }, [scheduleIdToShow]);

    async function getScheduleDetails() {
        const data = (await scheduleDetailsQuery({ variables: { id: scheduleIdToShow } })).data.getScheduleDetailsById
        setScheduleDetails(data)
    }

    function closeModal() {
        document.getElementById('close-details-schedule-modal').click()
    }


    if (loading) return <p>Carregando informações do agendamento</p>

    return (
        <div className="modal fade" id="scheduleDetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-details-schedule-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center" >Cadastrar Nova Agenda</h1>

                        <form className="mt-3">
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Funcionário</label>
                                <input defaultValue={scheduleDetails?.employee} disabled type="text" className="border-orange form-control mw-400" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Especialidade</label>
                                <input type="text" className="border-orange form-control mw-400" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Data</label>
                                <input className="border-orange form-control mw-400" maxLength={10} minLength={10} type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Horário</label>
                                <input className="border-orange form-control mw-400" type="text" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Cliente</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Cliente</label>
                                <input type="text" className="border-orange form-control mw-400" />
                            </div>
                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Pet</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Nome</label>
                                <input type="text" className="border-orange form-control mw-400" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Raça</label>
                                <input disabled className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Genêro</label>
                                <input disabled className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Castrado?</label>
                                <input disabled className="border-orange form-control mw-400" type="text" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados de pagamento</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Valor do serviço</label>
                                <input placeholder="R$ 150" className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Método de pagamento</label>
                                <input type="text" className="border-orange form-control mw-400" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Informações adicionais</h2>
                            <div className="mb-3 d-flex justify-content-center">
                                <textarea className="border-orange form-control mw-80"></textarea>
                            </div>

                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalScheduleDetails;