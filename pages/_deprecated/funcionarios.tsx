import EmployeesList from "../../components/EmployeesList";
import ModalEditEmployee from "../../components/Modals/ModalEditEmployee";
import ModalRegisterEmployee from "../../components/Modals/ModalRegisterEmployee";

const Employees = () => {

    return (
        <section className='container bg-white-sec pt-5'>
            <div className="pt-md-5 d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-black mt-4 pt-5 pt-md-0">Funcionários</h4>
                <EmployeesList />
                <button data-bs-toggle="modal" data-bs-target="#registerEmployeeModal" className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Novo Funcionário</button>
            </div>
            <ModalRegisterEmployee />
            <ModalEditEmployee />
        </section>
    );
}

export default Employees;