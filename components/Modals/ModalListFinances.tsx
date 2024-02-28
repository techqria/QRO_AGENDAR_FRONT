import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { useEffect, useState } from "react"
import  { GET_FINANCE_BY_USER } from "../../graphql/services/finance.service";
import { IFinanceListByUser } from "../../interfaces";
import { useLazyQuery } from "@apollo/client";

const ModalListFinances = () => {

    const { id,name } = useSelector((store: IStore) => store.employee)

    const [financeData, setFinanceData] = useState<IFinanceListByUser[]>([])
    const [getFinanceQuery] = useLazyQuery(GET_FINANCE_BY_USER)

    useEffect(() => {
        async function getData() {
            setFinanceData((await getFinanceQuery({ variables: { id } })).data.getFinanceListByUser)
        }
        getData()
    }, [id]);

    return (
        <div className="modal fade" id="listFinancesModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                <div key={index} className="d-flex justify-content-between bg-white p-3">
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-black fw-bold mb-0">{el.customer_name}</h5>
                                        <span className="text-black fw-light">Cliente</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-black fw-bold mb-0">{new Date(el.date).toLocaleDateString('pt-BR')}</h5>
                                        <span className="text-black fw-light">Data</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-black fw-bold mb-0">{new Date(el.date).toLocaleTimeString('pt-BR')}</h5>
                                        <span className="text-black fw-light">Horário</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-primary fw-bold mb-0">{el.payment.method}</h5>
                                        <span className="text-black fw-light">Forma de pagamento</span>
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-primary fw-bold mb-0">R${el.payment.price}</h5>
                                        <span className="text-black fw-light">Valor da Consulta</span>
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