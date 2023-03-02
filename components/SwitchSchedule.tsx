import { useDispatch } from "react-redux";
import { SchedulePeriodicityEnum } from "../dto/schedule-periodicity.enum";
import { changeSchedule } from "../store/slices/scheduleSlice";
import { useState } from "react";

const SwitchSchedule = ({ periodicityToShow }) => {

    const dispatch = useDispatch();

    const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [currentYear] = useState(new Date().getFullYear());

    return (
        <div className="mt-4 d-flex gap-3">
            <button
                className={`btn w-90 ${periodicityToShow === SchedulePeriodicityEnum.monthSchedule ? 'btn-orange' : 'btn-orange-sec'}`}
                onClick={() => dispatch(changeSchedule())}
            >
                Mês
            </button>
            <button
                className={`btn w-90 ${periodicityToShow === SchedulePeriodicityEnum.weekSchedule ? 'btn-orange' : 'btn-orange-sec'}`}
                onClick={() => dispatch(changeSchedule())}
            >
                Semana
            </button>
            <div className="d-flex gap-2 align-items-center">
                <img role="button" width={30} src="/icons/arrow-left.svg" alt="arrow-left.svg" />
                <h6 className="m-0 text-black text-capitalize">{currentMonth}&nbsp;{currentYear}</h6>
                <img role="button" width={30} src="/icons/arrow-right.svg" alt="arrow-left.svg" />
            </div>
        </div>
    );
}

export default SwitchSchedule;