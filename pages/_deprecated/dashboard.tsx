import FinanceChart from "../../components/Charts/FinanceChart";
import PaymentMethodChart from "../../components/Charts/PaymentMethodChart";
import SpecialtyChart from "../../components/Charts/SpecialtyChart";
import TimeChart from "../../components/Charts/TimeChart";

const Dashboard = () => {
    return (
        <div className="container bg-white-sec pt-5">
            <h2 className="w-100 text-start text-black">Dashboard</h2>

            <section className='row mt-5 justify-content-between'>
                <FinanceChart />
                <PaymentMethodChart />
                <SpecialtyChart />
                <TimeChart />
            </section>
        </div>
    );
}

export default Dashboard;