import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { FormatBgColor } from "../../hooks/FomatBgColor";
import { IScheduleCalendar } from "../../interfaces";
import scheduleService from "../../graphql/services/schedule.service";

export const MonthlyCalendar = () => {

    const { monthDate } = useSelector((store: IStore) => store.schedule);

    const [schedules, setSchedules] = useState<IScheduleCalendar[]>([]);

    useEffect(() => {
        async function getData() {
            setSchedules(await scheduleService.getSchedulesCalendar())
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
            console.log(filtered)
            return <div className="d-flex flex-column">
                {filtered.map((filter, index) => index <= 1 && <p key={index} className="ps-1" role="button" style={{ color: FormatBgColor(filter.employee_color), backgroundColor: filter.employee_color }} >{filter.specialty_name}</p>)}

                {(filtered.length != 2 && filtered.length > 1) &&
                    <p role="button" className="fit-content text-orange border-orange rounded m-0 p-1 pb-0">+{Math.abs(filtered.length - 2)}</p>
                }
            </div>
        }
        return ''
    }, [schedules, monthDate])

    return (
        <div className="pt-5 text-black w-100 d-flex flex-wrap justify-content-center">
            {
                new Array(totalMonthDays).fill(0).map((el, index) => (
                    <div key={index} className="square-calendar border p-2 overflow-hidden">
                        <p className="text-end mb-0 fs-5">{index + 1}</p>
                        {checkScheduleDate(index + 1)}
                    </div>
                ))
            }
        </div >
    )
}