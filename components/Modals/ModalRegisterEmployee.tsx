import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { RoleEnum } from "../../enum/role.enum";
import RegisterEmployeeForm from "../Forms/RegisterEmployeeForm";
import { useState } from "react";
import RegisterManagerForm from "../Forms/RegisterManagerForm";

const ModalRegisterEmployee = () => {

    const { role: userRole } = useSelector((store: IStore) => store.user)

    const [showEmployeeForm, setShowEmployeeForm] = useState(true);

    return (
        <div className="modal fade"  id="registerEmployeeModal" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        {
                            userRole === RoleEnum.admin &&
                            <div className="d-flex gap-2">
                                <input checked={showEmployeeForm} type="radio" name="type" id="manager" onChange={() => setShowEmployeeForm(!showEmployeeForm)}/>
                                <label className="text-dark" htmlFor="manager">Gerente</label>
                                <input type="radio" name="type" id="employee" onChange={() => setShowEmployeeForm(!showEmployeeForm)}/>
                                <label className="text-dark" htmlFor="employee">Funcionário</label>
                            </div>
                        }
                        <button id="close-register-modal-employee" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-start" >Cadastrar Novo Funcionário</h1>
                        {
                            showEmployeeForm && userRole === RoleEnum.admin
                                ? <RegisterManagerForm />
                                : <RegisterEmployeeForm />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRegisterEmployee;