import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import SwitchSchedule from "../../components/SwitchSchedule";
import ScheduleList from "../../components/ScheduleList";
import { MonthlyCalendar } from "../../components/Calendar/MonthlyCalendar";
import { useCallback } from "react";
import { SchedulePeriodicityEnum } from "../../dto/schedule-periodicity.enum";
import { WeekCalendar } from "../../components/Calendar/WeekCalendar";
import { EmployeesSchedule } from "../../components/EmployeesSchedule";

const Schedule = () => {

    const { periodicityToShow } = useSelector((store: IStore) => store.schedule)

    const chooseCalendar = useCallback(() => {
        switch(periodicityToShow){
            case SchedulePeriodicityEnum.monthSchedule: return <MonthlyCalendar />
            case SchedulePeriodicityEnum.weekSchedule: return <WeekCalendar />
        }
    }, [periodicityToShow])

    return (
        <section className='container pt-5 bg-white-sec d-flex flex-column justify-content-center align-items-center'>
            <h4 className="text-black mt-4 pt-5">{periodicityToShow}</h4>
            <SwitchSchedule periodicityToShow={periodicityToShow} />
            <EmployeesSchedule />
            {chooseCalendar()}
            <button className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Nova Agenda</button>
        </section>
    );
}

export default Schedule;