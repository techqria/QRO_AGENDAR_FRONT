import EmployeesList from "../components/EmployeesList";

const Employees = () => {

    return (
        <section className='bg-white-sec h-100vh'>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-black">Funcionários</h2>
                <EmployeesList />
                <button className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Novo Funcionário</button>
            </div>
        </section>
    );
}

export default Employees;