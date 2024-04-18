import { useSelector } from "react-redux";
import FinanceChart from "../../components/Charts/FinanceChart";
import PaymentMethodChart from "../../components/Charts/PaymentMethodChart";
import SpecialtyChart from "../../components/Charts/SpecialtyChart";
import TimeChart from "../../components/Charts/TimeChart";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import { IStore } from "../../store/types/types";

const Dashboard = () => {

    const { startDate, finalDate } = useSelector((store: IStore) => store.dateFilter)

    return (
        <div className="container bg-white-sec pt-5 d-flex flex-column gap-3">
            <h2 className="w-100 text-start text-black">Dashboard</h2>

            <div className="d-flex align-self-end gap-2">
                <DateRangePicker startDate={startDate} finalDate={finalDate} />
            </div>

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