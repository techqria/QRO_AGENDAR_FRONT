import FinanceChart from "../../components/Charts/FinanceChart";

const Dashboard = () => {
    return (
        <div className="container bg-white-sec pt-5">
            <h2 className="w-100 text-start text-black mt-5 pt-5">Dashboard</h2>

            <section className='row mt-5'>
                <FinanceChart />
            </section>
        </div>
    );
}

export default Dashboard;