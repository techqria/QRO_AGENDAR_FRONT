import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import SwitchSchedule from "../../components/SwitchSchedule";
import ScheduleList from "../../components/ScheduleList";

const Schedule = () => {

    const { periodicityToShow } = useSelector((store: IStore) => store.schedule)

    return (
        <section className='container pt-5 pt-md-0 bg-white-sec h-100vh d-flex flex-column justify-content-center align-items-center'>
            <h4 className="text-black">{periodicityToShow}</h4>
            <SwitchSchedule periodicityToShow={periodicityToShow} />
            <ScheduleList periodicityToShow={periodicityToShow}/>
            <button className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Nova Agenda</button>
        </section>
    );
}

export default Schedule;