import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { useEffect, useState } from "react"
import { GET_FINANCE_BY_USER } from "../../graphql/services/finance.service";
import { IFinanceListByUser } from "../../interfaces";
import { useLazyQuery } from "@apollo/client";
import { AuthHeader } from "../../hooks/AuthHeader";

const ModalListFinances = () => {

    const { id, name } = useSelector((store: IStore) => store.employee)
    const { startDate, finalDate } = useSelector((store: IStore) => store.dateFilter)

    const [financeData, setFinanceData] = useState<IFinanceListByUser[]>([])
    const [getFinanceQuery] = useLazyQuery(GET_FINANCE_BY_USER, AuthHeader())

    useEffect(() => {
        async function getData() {
            console.log('line 19:', id)
            const financeData = (await getFinanceQuery({ variables: { id, startDate, finalDate } })).data?.getFinanceListByUser
            setFinanceData(financeData)
        }
        getData()
    }, [id]);

    return (
        <div className="modal fade" id="listFinancesModal"  tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '90%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h1 className="text-black fs-4 ps-3">{name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            financeData?.map((el, index) => (
                                <div key={index} className="d-flex justify-content-between bg-white p-3 text-black">
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Cliente</h5>
                                        <span>{el.customer_name}</span>
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Nome do pet</h5>
                                        <span>{el.pet_name}</span>
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Raça do pet</h5>
                                        <span>{el.pet_breed}</span>
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Tipo do pet</h5>
                                        <span>{el.pet_type}</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Data</h5>
                                        <span>{new Date(el.date).toLocaleDateString('pt-BR')}</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Horário</h5>
                                        <span>{new Date(el.date).toLocaleTimeString('pt-BR')}</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Forma de pagamento</h5>
                                        <span className="text-primary">{el.payment.method}</span>
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="fw-bold mb-0">Valor da Consulta</h5>
                                        <span className="text-primary">R${el.payment.price}</span>
                                    </div>
                                    {/* 
                                    <button className="d-flex align-items-center p-0 m-0 btn btn-transparent">
                                        <img role="button" src="https://raw.githubusercontent.com/gist/Aenewsss/f05e99713590aa05bcf312921ff07808/raw/c2501a00156f9fcc9da7bbf6e3e4946ed6f0e9ce/check-list-icon.svg" alt="" />
                                        <img role="button" src="https://raw.githubusercontent.com/gist/Aenewsss/0ab6e5683c4e5b3cb99534e089be002c/raw/36b0ea89bab16f143cee05f1842e4ff5d0345333/cancel-list-icon.svg" alt="" />
                                    </button> */}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalListFinances;