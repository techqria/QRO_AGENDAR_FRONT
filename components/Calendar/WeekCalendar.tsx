import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { useCallback, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const nameDaysWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const WeekCalendar = () => {

    const { weekDate } = useSelector((store: IStore) => store.schedule);

    const [datesArray, setDatesArray] = useState([]);
    const [startWeekDate, setStartWeekDate] = useState<Date>(new Date());
    const [datesOfWeek, setDatesOfWeek] = useState([]);

    useEffect(() => {
        const newArray = new Array(20).fill({}).map(_ => {
            return {
                date: faker.date.recent(100, new Date(new Date(weekDate).getFullYear(), new Date(weekDate).getMonth() + 2, 0)).toISOString(),
                service: faker.commerce.department(),
                hour: faker.date.recent(10).getHours() + ':' + faker.date.recent(10).getMinutes(),
                color: faker.color.rgb()
            }
        })

        setDatesArray(newArray)

        discoverFirstWeekDate()
    }, []);

    useEffect(() => {
        fillDaysOfWeek(startWeekDate)
    }, [startWeekDate]);

    useEffect(() => {
        discoverFirstWeekDate()
    }, [weekDate]);

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
        const filtered = datesArray.filter(el =>
            new Date(el.date).getMonth() == date.getMonth() &&
            new Date(el.date).getDate() == date.getDate()
        )
        if (filtered.length) {
            return <div className="d-flex flex-column">
                {filtered.map((filter, index) => index <= 1 &&
                    <div className="d-flex gap-2 flex-column mt-4 bg-white rounded p-2">
                        <p role="button" style={{color: filter.color}} className="m-0 fs-5">{filter.hour}</p>
                        <p role="button" style={{color: filter.color}} className="m-0">{filter.service}</p>
                    </div>
                )}

                {(filtered.length != 2 && filtered.length > 1) &&
                    <div className="d-flex justify-content-end mt-2">
                        <button className="btn btn-orange-outline rounded-circle m-0">+{Math.abs(filtered.length - 2)}</button>
                    </div>
                }
            </div>
        }
        return
    }, [datesOfWeek])


    return (
        <div className="pt-5 text-black w-100 d-flex flex-wrap justify-content-center">
            {
                nameDaysWeek.map((el, index) => (
                    <div className="week-calendar border p-2 overflow-hidden">
                        <p className="text-center mb-0 fs-5">{datesOfWeek[index]?.getDate()}</p>
                        <p className="text-center mb-0 fs-5">{el}</p>
                        {checkScheduleDate(datesOfWeek[index])}
                    </div>
                ))
            }
        </div >
    )
}
