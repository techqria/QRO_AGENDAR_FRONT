import { useCallback } from "react"
import { SchedulePeriodicityEnum } from "../dto/schedule-periodicity.enum"

const ScheduleList = ({ periodicityToShow }) => {

    let data = [
        { name: 'Nome', date: '02/3/2023', hour: '08:30', specialty: 'especialidade 1' },
        { name: 'Nome', date: '03/3/2023', hour: '18:00', specialty: 'especialidade 1' },
        { name: 'Nome', date: '07/3/2023', hour: '22:30', specialty: 'especialidade 1' },
        { name: 'Segundo', date: '13/3/2023', hour: '12:25', specialty: 'especialidade 2' },
        { name: 'Segundo', date: '22/3/2023', hour: '07:15', specialty: 'especialidade 2' },
        { name: 'Segundo', date: '18/3/2023', hour: '19:30', specialty: 'especialidade 2' },
    ]

    const cards = useCallback((schedule, index: number) => {
        if (index % 2 == 0) {
            return <div key={index} className="text-dark bg-beige mt-3 p-4 rounded">{schedule.name}&nbsp;{schedule.hour}&nbsp;{schedule.date}</div>
        } else {
            return <div key={index} className="text-dark bg-royal-blue mt-3 p-4 rounded">{schedule.name}&nbsp;{schedule.hour}&nbsp;{schedule.date}</div>
        }
    }, [])

    const listByMonth = useCallback(() => {
        return data.filter(el => Number(el.date[3]) == new Date().getMonth() + 1).map((schedule, index) => cards(schedule, index))
    }, [data])

    const listByWeek = useCallback(() => {
        return data.filter(el => Number(el.date.split('/', 1)[0]) <= new Date().getDate() + 6).map((schedule, index) => cards(schedule, index))
    }, [data])

    const listSchedule = useCallback(() => {
        switch (periodicityToShow) {
            case SchedulePeriodicityEnum.monthSchedule: return listByMonth()
            case SchedulePeriodicityEnum.weekSchedule: return listByWeek()
        }
    }, [periodicityToShow, listByWeek, listByMonth])

    return <div className="mt-5">{listSchedule()}</div>;
}

export default ScheduleList;