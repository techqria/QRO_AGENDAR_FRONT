import CardsFinance from "../../components/CardsFinance";
import ListFinance from "../../components/ListFinance";

const Finance = () => {

    return (
        <section className='container bg-white-sec h-100vh d-flex flex-column justify-content-center align-items-center'>
            <h2 className="w-100 text-start text-black">Finanças</h2>
            <CardsFinance />
            <ListFinance />
        </section>
    );
}

export default Finance;