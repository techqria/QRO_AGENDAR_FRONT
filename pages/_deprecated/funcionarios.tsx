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
                <div className="d-flex justify-content-between w-100">
                    <div className="text-start">
                        <h2>Funcionários</h2>
                        <p >Lista de informações de funcionários, tais como especialidade, email e telefone.</p>
                    </div>
                    <div className="d-flex gap-4">
                        <button data-bs-toggle="modal" data-bs-target="#registerEmployeeModal" className="btn btn-orange rounded fw-bold">+ Novo Funcionário</button>
                        <button data-bs-toggle="modal" data-bs-target="#registerSpecialtyModal" className="btn btn-orange rounded fw-bold">+ Nova Especialidade</button>
                    </div>
                </div>
                <EmployeesList />
            </div>
            <ModalRegisterEmployee />
            <ModalRegisterSpecialty />
            <ModalRegisterCustomer />
            <ModalEditEmployee />
        </section>
    );
}

export default Employees;