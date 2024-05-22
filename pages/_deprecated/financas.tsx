import CardsFinance from "../../components/CardsFinance";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import ListFinance from "../../components/ListFinance";
import ModalListFinances from "../../components/Modals/ModalListFinances";

const Finance = () => {

    return (
        <section className='container bg-white-sec h-100 d-flex flex-column justify-content-center align-items-center pt-md-0 pt-4'>
            <h2 className="w-100 text-start text-black mt-5 pt-5">Finanças</h2>
            <CardsFinance />
            <div className="d-flex align-self-end gap-2 mt-4">
                <DateRangePicker />
            </div>
            <ListFinance />
            <ModalListFinances />
        </section>
    );
}

export default Finance;