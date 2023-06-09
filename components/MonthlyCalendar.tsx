import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../store/types/types";

export const MonthlyCalendar = () => {

    const { monthDate } = useSelector((store: IStore) => store.schedule);


    const [datesArray, setDatesArray] = useState([]);

    useEffect(() => {
        const newArray = new Array(40).fill({}).map(_ => {
            return {
                date: faker.date.recent(totalMonthDays, new Date(new Date(monthDate).getFullYear(), new Date(monthDate).getMonth() + 1, 0)).toISOString(),
                service: faker.commerce.department()
            }
        })

        setDatesArray(newArray)

        setTotalMonthDays(handleTotalMonthDays)
    }, [, monthDate]);


    const handleTotalMonthDays = () => {
        const newMonthDate = new Date(monthDate)
        return new Date(newMonthDate.getFullYear(), newMonthDate.getMonth() + 1, 0).getDate()
    }

    const [totalMonthDays, setTotalMonthDays] = useState(handleTotalMonthDays);

    const checkScheduleDate = useCallback((day: number) => {
        const filtered = datesArray.filter(el => new Date(el.date).getDate() == day)
        if (filtered.length) {
            return <div className="d-flex flex-column">
                {filtered.map((filter, index) => index <= 1 && <p role="button" className="text-secondary m-0">{filter.service}</p>)}

                {(filtered.length != 2 && filtered.length > 1) &&
                    <div className="d-flex justify-content-end mt-2">
                        <button className="btn btn-orange-outline rounded-circle m-0">+{Math.abs(filtered.length - 2)}</button>
                    </div>
                }
            </div>
        }
        return ''
    }, [datesArray])

    return (
        <div className="pt-5 text-black w-100 d-flex flex-wrap justify-content-center">
            {
                new Array(totalMonthDays).fill(0).map((el, index) => (
                    <div className="square-calendar border p-2 overflow-hidden">
                        <p className="text-end mb-0 fs-5">{index + 1}</p>
                        {checkScheduleDate(index + 1)}
                    </div>
                ))
            }
        </div >
    )
}