import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { FormatBgColor } from "../../hooks/FomatBgColor";
import { IScheduleCalendar } from "../../interfaces";
import { GET_SCHEDULES_CALENDAR } from "../../graphql/services/schedule.service";
import { useLazyQuery } from "@apollo/client";
import { ModalsEnum } from "../../enum/modals.enum";
import { changeScheduleIdToShow } from "../../store/slices/scheduleSlice";

export const MonthlyCalendar = () => {

    const dispatch = useDispatch()

    const { monthDate } = useSelector((store: IStore) => store.schedule);

    const [schedules, setSchedules] = useState<IScheduleCalendar[]>([]);

    const [schedulesQuery, { data }] = useLazyQuery(GET_SCHEDULES_CALENDAR)

    useEffect(() => {
        getSchedules()
        setTotalMonthDays(handleTotalMonthDays)
    }, [data, monthDate]);

    async function getSchedules() {
        setSchedules((await schedulesQuery()).data.getSchedulesCalendar)
    }

    const handleTotalMonthDays = () => {
        const newMonthDate = new Date(monthDate)
        return new Date(newMonthDate.getFullYear(), newMonthDate.getMonth() + 1, 0).getDate()
    }

    const [totalMonthDays, setTotalMonthDays] = useState(handleTotalMonthDays);

    function checkSameDate(schedule: IScheduleCalendar, day: number) {
        const daysMatch = new Date(schedule.date).getDate() == day
        const monthsMatch = new Date(schedule.date).getMonth() + 1 == new Date(monthDate).getMonth() + 1
        return daysMatch && monthsMatch
    }

    function checkSquareClick(e: any) {
        const { className }: { className: string } = e.target
        if (className.includes('square-calendar')) document.querySelector(ModalsEnum.REGISTER_MODAL).click()
    }

    function setScheduleIdToShowDetails(id: string) {
        dispatch(changeScheduleIdToShow(id))
    }

    const checkScheduleDate = useCallback((day: number) => {
        const filtered = schedules?.filter(el => checkSameDate(el, day)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        if (filtered.length) {
            return <div className="d-flex flex-column gap-1">
                {filtered.map((filter, index) => index <= 2 &&
                    <p onClick={_ => setScheduleIdToShowDetails(filter.id)} key={index} data-bs-toggle="modal" data-bs-target="#scheduleDetailsModal" className="ps-1 my-0 rounded scale-05" role="button" style={{ color: FormatBgColor(filter.employee_color), backgroundColor: filter.employee_color }} >
                        {filter.specialty_name}
                    </p>
                )}

                {(filtered.length > 2) &&
                    <button className="btn btn-default d-flex align-self-end text-black fw-semibold fs-14 rounded m-0 p-0">Ver mais</button>
                }
            </div>
        }
        return ''
    }, [schedules, monthDate])

    return (
        <div className="pt-5 text-black w-100 d-flex flex-wrap justify-content-center">
            {
                new Array(totalMonthDays).fill(0).map((el, index) => (
                    <div onClick={checkSquareClick} role="button" key={index} className="square-calendar border p-1 overflow-hidden">
                        <p className="text-end mb-0 fs-5">{index + 1}</p>
                        {checkScheduleDate(index + 1)}
                    </div>
                ))
            }
        </div >
    )
}