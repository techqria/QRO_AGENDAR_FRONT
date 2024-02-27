import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { FormatBgColor } from "../../hooks/FomatBgColor";
import { IScheduleCalendar } from "../../interfaces";
import scheduleService, { GET_ALL_SCHEDULES, GET_SCHEDULES_CALENDAR } from "../../graphql/services/schedule.service";
import { useLazyQuery, useQuery } from "@apollo/client";

export const MonthlyCalendar = () => {

    const { monthDate } = useSelector((store: IStore) => store.schedule);

    const [schedules, setSchedules] = useState<IScheduleCalendar[]>([]);

    const [schedulesQuery, { loading }] = useLazyQuery(GET_SCHEDULES_CALENDAR)

    useEffect(() => {
        async function getData() {
            setSchedules((await schedulesQuery()).data.getSchedulesCalendar)
        }
        getData()

        setTotalMonthDays(handleTotalMonthDays)
    }, [, monthDate]);


    const handleTotalMonthDays = () => {
        const newMonthDate = new Date(monthDate)
        return new Date(newMonthDate.getFullYear(), newMonthDate.getMonth() + 1, 0).getDate()
    }

    const [totalMonthDays, setTotalMonthDays] = useState(handleTotalMonthDays);

    const checkScheduleDate = useCallback((day: number) => {
        const filtered = schedules?.filter(el => new Date(el.date).getDate() == day && new Date(el.date).getMonth() + 1 == new Date(monthDate).getMonth() + 1)
        if (filtered.length) {
            return <div className="d-flex flex-column gap-1">
                {filtered.map((filter, index) => index <= 2 &&
                    <p key={index} className="ps-1 my-0 rounded " role="button" style={{ color: FormatBgColor(filter.employee_color), backgroundColor: filter.employee_color }} >
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
                    <div key={index} className="square-calendar border p-1 overflow-hidden">
                        <p className="text-end mb-0 fs-5">{index + 1}</p>
                        {checkScheduleDate(index + 1)}
                    </div>
                ))
            }
        </div >
    )
}