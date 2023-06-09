import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import SwitchSchedule from "../../components/SwitchSchedule";
import ScheduleList from "../../components/ScheduleList";
import { MonthlyCalendar } from "../../components/MonthlyCalendar";

const Schedule = () => {

    const { periodicityToShow } = useSelector((store: IStore) => store.schedule)

    return (
        <section className='container pt-5 bg-white-sec d-flex flex-column justify-content-center align-items-center'>
            <h4 className="text-black mt-4 pt-5">{periodicityToShow}</h4>
            <SwitchSchedule periodicityToShow={periodicityToShow} />
            {/* <ScheduleList periodicityToShow={periodicityToShow}/> */}
            <MonthlyCalendar />
            <button className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Nova Agenda</button>
        </section>
    );
}

export default Schedule;