import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { useCallback, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { IScheduleCalendar } from "../../interfaces";
import { GET_SCHEDULES_CALENDAR } from "../../graphql/services/schedule.service";
import { FormatBgColor } from "../../hooks/FomatBgColor";
import { useLazyQuery } from "@apollo/client";

const nameDaysWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const WeekCalendar = () => {

    const { weekDate } = useSelector((store: IStore) => store.schedule);

    const [startWeekDate, setStartWeekDate] = useState<Date>(new Date());
    const [datesOfWeek, setDatesOfWeek] = useState([]);

    const [schedules, setSchedules] = useState<IScheduleCalendar[]>([]);
    const [schedulesQuery, { data }] = useLazyQuery(GET_SCHEDULES_CALENDAR)

    useEffect(() => {
        getSchedules()

        discoverFirstWeekDate()
    }, [data]);

    useEffect(() => {
        fillDaysOfWeek(startWeekDate)
    }, [startWeekDate]);

    useEffect(() => {
        discoverFirstWeekDate()
    }, [weekDate]);

    async function getSchedules() {
        setSchedules((await schedulesQuery()).data.getSchedulesCalendar)
    }
    function discoverFirstWeekDate() {
        const today = new Date(weekDate)
        const dayOfWeek = today.getDay()

        const startDate = new Date(today.setDate(today.getDate() - dayOfWeek))
        setStartWeekDate(startDate)
    }

    function fillDaysOfWeek(startWeekDate: Date) {
        let count = 0;

        const daysOfWeekArray = new Array(7).fill(0).map(_ => {
            const date = new Date(startWeekDate.getFullYear(), startWeekDate.getMonth(), startWeekDate.getDate() + count)
            count++;
            return date;
        })

        setDatesOfWeek(daysOfWeekArray)
    }

    const checkScheduleDate = useCallback((date: Date) => {
        const filtered = schedules.filter(el =>
            new Date(el.date).getMonth() == date.getMonth() &&
            new Date(el.date).getDate() == date.getDate()
        ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        if (filtered.length) {
            return <div className="d-flex flex-column gap-2 mt-2">
                {filtered.map((filter, index) => index <= 2 &&
                    <div key={index} className="d-flex gap-2 flex-column rounded p-2" style={{ color: FormatBgColor(filter.employee_color), backgroundColor: filter.employee_color }}>
                        <p role="button" className="m-0 fs-5">{new Date(filter.date).toLocaleTimeString('pt-BR', { hour: "2-digit", minute: "2-digit" })}</p>
                        <p role="button" className="m-0 text-capitalize">{filter.specialty_name}</p>
                    </div>
                )}

                {(filtered.length > 2) &&
                    <button className="btn btn-default d-flex align-self-end text-black fw-semibold fs-14 rounded m-0 p-0">Ver mais</button>
                }

            </div>
        }
        return
    }, [datesOfWeek])


    return (
        <div className="pt-5 text-black w-100 d-flex flex-wrap justify-content-center">
            {
                nameDaysWeek.map((el, index) => (
                    <div key={index} className="week-calendar border p-2 overflow-hidden">
                        <p className="text-center mb-0 fs-5">{datesOfWeek[index]?.getDate()}</p>
                        <p className="text-center mb-0 fs-5">{el}</p>
                        {checkScheduleDate(datesOfWeek[index])}
                    </div>
                ))
            }
        </div >
    )
}
