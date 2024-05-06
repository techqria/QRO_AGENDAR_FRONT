import FinanceChart from "../../components/Charts/FinanceChart";
import SpecialtyChart from "../../components/Charts/SpecialtyChart";
import TimeChart from "../../components/Charts/TimeChart";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";

const Dashboard = () => {

    return (
        <div className="container bg-white-sec pt-5 d-flex flex-column gap-3">
            <h2 className="w-100 text-start text-black">Dashboard</h2>

            <div className="d-flex align-self-end gap-2">
                <DateRangePicker/>
            </div>

            <section className='row mt-5 justify-content-between'>
                <FinanceChart />
                <SpecialtyChart />
                <TimeChart />
            </section>
        </div>
    );
}

export default Dashboard;