import { useSelector } from "react-redux";
import EmployeesList from "../../components/EmployeesList";
import ModalEditEmployee from "../../components/Modals/ModalEditEmployee";
import ModalRegisterEmployee from "../../components/Modals/ModalRegisterEmployee";
import { IStore } from "../../store/types/types";
import ModalRegisterSpecialty from "../../components/Modals/ModalRegisterSpecialty";
import ModalEditSpecialty from "../../components/Modals/ModalEditSpecialty";
import ModalRegisterCustomer from "../../components/Modals/ModalRegisterCustomer";

const Employees = () => {

    return (
        <section className='container bg-white-sec pt-5'>
            <div className="pt-md-5 d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-black mt-4 pt-5 pt-md-0">Funcionários</h4>
                <EmployeesList />
                <div className="d-flex gap-4">
                    <button data-bs-toggle="modal" data-bs-target="#registerEmployeeModal" className="btn btn-orange mt-5 rounded fw-bold">Cadastrar Novo Funcionário</button>
                    <button data-bs-toggle="modal" data-bs-target="#registerSpecialtyModal" className="btn btn-orange mt-5 rounded fw-bold">Cadastrar Nova Especialidade</button>
                </div>
            </div>
            <ModalRegisterEmployee />
            <ModalRegisterSpecialty />
            <ModalRegisterCustomer />
            <ModalEditEmployee />
            <ModalEditSpecialty />
        </section>
    );
}

export default Employees;