import EmployeesList from "../../components/EmployeesList";

const Employees = () => {

    return (
        <section className='bg-white-sec h-100vh'>
            <div className="container pt-5 pt-md-0 d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-black pt-5 pt-md-0">Funcionários</h4>
                <EmployeesList />
                <button className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Novo Funcionário</button>
            </div>
        </section>
    );
}

export default Employees;