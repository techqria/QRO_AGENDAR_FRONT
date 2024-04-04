import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_SCHEDULE_DETAIL_BY_ID } from "../../graphql/services/schedule.service";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { IScheduleDetails } from "../../interfaces";
import { paymentMethodEnum } from "../../enum/payment-method.enum";

const ModalScheduleDetails = () => {

    const { scheduleIdToShow } = useSelector((store: IStore) => store.schedule)

    const [scheduleDetails, setScheduleDetails] = useState<IScheduleDetails>();

    const [scheduleDetailsQuery, { loading, data }] = useLazyQuery(GET_SCHEDULE_DETAIL_BY_ID)

    useEffect(() => {
        scheduleIdToShow != '' && getScheduleDetails()
    }, [scheduleIdToShow]);

    async function getScheduleDetails() {
        const data = (await scheduleDetailsQuery({ variables: { id: scheduleIdToShow } })).data.getScheduleDetailsById
        setScheduleDetails(data)
    }


    return (
        <div className="modal fade" id="scheduleDetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-details-schedule-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex flex-column align-items-center">
                        <h1 className="modal-title fs-5 text-orange" >Detalhes do agendamento</h1>
                        {
                            (loading || !data) ? <p className="text-black mt-5">Carregando informações do agendamento</p>
                                :
                                <ul className="mt-4 text-black">
                                    <li><span className="fw-bold">Funcionário </span>{scheduleDetails.employee}</li>
                                    <li><span className="fw-bold">Especialidade </span>{scheduleDetails.specialty}</li>
                                    <li><span className="fw-bold">Data </span>{new Date(scheduleDetails.date).toLocaleDateString("pt-BR")}</li>
                                    <li><span className="fw-bold">Horário </span>{new Date(scheduleDetails.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</li>
                                    <li><span className="fw-bold">Cliente </span>Nome: {scheduleDetails.customer_name} - Telefone: {scheduleDetails.customer_phone}</li>
                                    <li><span className="fw-bold">Pet </span>Nome: {scheduleDetails.pet_name} - Raça: {scheduleDetails.pet_breed} - Tipo: {scheduleDetails.pet_type} - Castrado: {scheduleDetails.pet_neutered ? 'Sim' : 'Não'}</li>
                                    <li><span className="fw-bold">Informaçoes Adicionais </span>{scheduleDetails.text}</li>
                                </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalScheduleDetails;