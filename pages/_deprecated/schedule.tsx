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
            <h4 className="text-black mt-4 pt-5">{periodicityToShow}</h4>
            <div className="d-flex justify-content-between align-items-center w-100 mx-5 px-5">
                <button id="schedule-modal" data-bs-toggle="modal" data-bs-target="#registerScheduleModal" className="btn btn-orange mt-5 rounded fw-bold">+ Cadastrar Nova Agenda</button>
                <SwitchSchedule periodicityToShow={periodicityToShow} />
            </div>
            <EmployeesSchedule />
            {chooseCalendar()}
            <ModalRegisterSchedule />
            <ModalScheduleDetails />
        </section>
    );
}

export default Schedule;