import { GET_FINANCES } from "../graphql/services/finance.service";
import { useDispatch } from "react-redux";
import { changeEmployeeId, changeEmployeeName } from "../store/slices/employee.slice";
import { useQuery } from "@apollo/client";
import { IEmployee, IFinanceList } from "../interfaces";
import { ToastMessage } from "../hooks/ToastMessage";
import { ToastEnum } from "../enum/toast.enum";
import { AuthHeader } from "../hooks/AuthHeader";

const ListFinance = () => {

    const dispatch = useDispatch()

    const { data, loading } = useQuery(GET_FINANCES,AuthHeader())

    const setEmployeeId = (employee: IFinanceList) => {
        if(!employee.qtt_schedules) return ToastMessage(ToastEnum.warning, "Funcionário não possui consultas")
        dispatch(changeEmployeeId(employee.employee_id))
        dispatch(changeEmployeeName(employee.employee_name))
    }

    if (loading) return <p>Carregando</p>

    return (
        <div className="w-100 d-flex flex-column gap-3 mt-5">
            {
                data.getFinanceList.map(el => (
                    <div key={el.employee_id} className="d-flex justify-content-between bg-white p-3">
                        <div className="d-flex flex-column">
                            <h5 className="text-black fw-bold">{el.employee_name}</h5>
                        </div>

                        <div className="d-flex flex-column">
                            <h5 className="text-black fw-bold">{el.qtt_schedules}</h5>
                            <span className="text-black">Consultas</span>
                        </div>

                        <div className="d-flex flex-column">
                            <h5 className="text-primary fw-bold">R${el.revenue_generated}</h5>
                            <span className="text-black">Valor total</span>
                        </div>

                        <button onClick={_ => setEmployeeId(el)} data-bs-toggle="modal" data-bs-target={`${el.qtt_schedules ? '#listFinancesModal' : ''}`} className="d-flex align-items-center p-0 m-0 btn btn-transparent">
                            <img role="button" src="https://raw.githubusercontent.com/gist/Aenewsss/fbe5368d795b9aececfdef9fa3c1edc9/raw/ab991ac12aa87c5ad47f3a8a2998415561c6b74e/modal-expand-qro-agendar.svg" alt="" />
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default ListFinance;