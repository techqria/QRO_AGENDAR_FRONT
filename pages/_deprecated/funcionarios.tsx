import EmployeesList from "../../components/EmployeesList";

const Employees = () => {

    return (
        <section className='container bg-white-sec pt-5'>
            <div className="pt-md-5 d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-black mt-4 pt-5 pt-md-0">Funcionários</h4>
                <EmployeesList />
                <button className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Novo Funcionário</button>
            </div>
        </section>
    );
}

export default Employees;