import EmployeesChart from "../../components/EmployeesChart";
import TypeOfServiceChart from "../../components/TypeOfServiceChart";

const Dashboard = () => {
    return (
        <div className="container bg-white-sec pt-5">
            <section className='pt-5 d-flex flex-column justify-content-center align-items-center'>
                <h3 className="text-black fw-normal pt-5">Seja bem-vindo, Aenã!</h3>
            </section >
            <section className='d-flex flex-row justify-content-start align-items-center'>
                <div style={{ width: "50%" }}>
                    <h5 className="text-black lead-font-size">Funcionários</h5>
                </div>
                <div style={{ width: "50%" }}>
                    <h5 className="text-black">Tipos de atendimento</h5>
                </div>
            </section>
            <section className='d-flex flex-row justify-content-center align-items-center'>
                <EmployeesChart />
                <TypeOfServiceChart />
            </section>
        </div>
    );
}

export default Dashboard;