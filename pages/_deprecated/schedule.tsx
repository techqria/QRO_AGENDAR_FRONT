import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import SwitchSchedule from "../../components/SwitchSchedule";
import { MonthlyCalendar } from "../../components/Calendar/MonthlyCalendar";
import { useCallback } from "react";
import { SchedulePeriodicityEnum } from "../../enum/schedule-periodicity.enum";
import { WeekCalendar } from "../../components/Calendar/WeekCalendar";
import { EmployeesSchedule } from "../../components/EmployeesSchedule";
import ModalRegisterSchedule from "../../components/Modals/ModalRegisterSchedule";
import ModalScheduleDetails from "../../components/Modals/ModalScheduleDetails";

const Schedule = () => {

    const { periodicityToShow } = useSelector((store: IStore) => store.schedule)

    const chooseCalendar = useCallback(() => {
        switch (periodicityToShow) {
            case SchedulePeriodicityEnum.monthSchedule: return <MonthlyCalendar />
            case SchedulePeriodicityEnum.weekSchedule: return <WeekCalendar />
        }
    }, [periodicityToShow])

    return (
        <section className='container pt-5 bg-white-sec d-flex flex-column justify-content-center align-items-center'>
            <EmployeesSchedule />
            <div className="d-flex justify-content-between w-100 align-items-center px-5">
                <h2 className="text-start mb-0">{periodicityToShow}</h2>
                <SwitchSchedule periodicityToShow={periodicityToShow} />
                <button id="schedule-modal" data-bs-toggle="modal" data-bs-target="#registerScheduleModal" className="btn btn-orange rounded fw-bold px-2">+ Nova Agenda</button>
            </div>
            {chooseCalendar()}
            <ModalRegisterSchedule />
            <ModalScheduleDetails />
        </section>
    );
}

export default Schedule;