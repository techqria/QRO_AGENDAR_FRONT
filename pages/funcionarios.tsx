import EmployeesList from "../components/EmployeesList";

const Employees = () => {



    return (
        <section className='container bg-white-sec h-100vh d-flex flex-column justify-content-center align-items-center'>
            <h2 className="text-black">Funcionários</h2>
            <EmployeesList />
        </section>
    );
}

export default Employees;