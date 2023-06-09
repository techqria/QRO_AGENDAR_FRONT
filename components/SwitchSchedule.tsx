import { useDispatch, useSelector } from "react-redux";
import { SchedulePeriodicityEnum } from "../dto/schedule-periodicity.enum";
import { changeMonthDate, changeSchedule, changeWeekDate } from "../store/slices/scheduleSlice";
import { useCallback, useEffect, useState } from "react";
import { IStore } from "../store/types/types";

const SwitchSchedule = ({ periodicityToShow }) => {

    const dispatch = useDispatch();

    const { monthDate, weekDate } = useSelector((store: IStore) => store.schedule);

    const [monthDateFormatted, setMonthDateFormatted] = useState(new Date(monthDate));
    const [weekDateFormatted, setWeekDateFormatted] = useState(new Date(weekDate));

    const [currentMonth, setCurrentMonth] = useState(monthDateFormatted.toLocaleString('default', { month: 'long' }));
    const [currentYear, setCurrentYear] = useState(monthDateFormatted.getFullYear());

    useEffect(() => {
        setMonthDateFormatted(new Date(monthDate))
        setCurrentMonth(new Date(monthDate).toLocaleString('default', { month: 'long' }));
        setCurrentYear(new Date(monthDate).getFullYear());
    }, [monthDate]);

    useEffect(() => {
        setWeekDateFormatted(new Date(weekDate))
    }, [weekDate]);

    const changeDateText = useCallback(() => {
        if (periodicityToShow === SchedulePeriodicityEnum.monthSchedule)
            return currentMonth + " " + currentYear
        else return 'Semana'
    }, [periodicityToShow, currentMonth, currentYear])

    const changeDate = (direction: string) => {
        switch (periodicityToShow) {
            case SchedulePeriodicityEnum.monthSchedule: return newMonthDate(direction)
            case SchedulePeriodicityEnum.weekSchedule: return newWeekDate(direction)
        }
    }

    const newMonthDate = (direction: string) => {
        switch (direction) {
            case 'previous': return dispatch(changeMonthDate(new Date(monthDateFormatted.setMonth(monthDateFormatted.getMonth() - 1)).getTime()))
            case 'next': return dispatch(changeMonthDate(new Date(monthDateFormatted.setMonth(monthDateFormatted.getMonth() + 1)).getTime()))
        }
    }

    const newWeekDate = (direction: string) => {
        switch (direction) {
            case 'previous': return dispatch(changeWeekDate(new Date(weekDateFormatted.setDate(weekDateFormatted.getDate() - 7)).getTime()))
            case 'next': return dispatch(changeWeekDate(new Date(weekDateFormatted.setDate(weekDateFormatted.getDate() + 7)).getTime()))
        }
    }

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
                <img onClick={() => changeDate('previous')} role="button" width={30} src="/icons/arrow-left.svg" alt="arrow-left.svg" />
                <h6 className="m-0 text-black text-capitalize">{changeDateText()}</h6>
                <img onClick={() => changeDate('next')} role="button" width={30} src="/icons/arrow-right.svg" alt="arrow-left.svg" />
            </div>
        </div>
    );
}

export default SwitchSchedule;