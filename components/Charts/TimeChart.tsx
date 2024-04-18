import { useEffect, useState } from "react";
import { GET_DASHBOARD_TIME } from "../../graphql/services/dashboard.service";
import { IWeekScheduleHours } from "../../interfaces";
import { useQuery } from "@apollo/client";
import { AuthHeader } from "../../hooks/AuthHeader";
import Tooltip from "../Tooltip";

const TimeChart = () => {

    const [timeArray, setTimeArray] = useState<IWeekScheduleHours[]>();
    const [highestTime, setHighestTime] = useState(0);

    const { data, loading } = useQuery(GET_DASHBOARD_TIME, AuthHeader())


    useEffect(() => {
        if (data) {
            const times = data.getDashboard.weekScheduleHours
            let arr = Object.values(times)
            arr = arr.slice(0, arr.length - 1)
            setTimeArray(arr as any)
            getHighestTime(arr)
        }
    }, [data]);


    function getHighestTime(array) {
        let arr = Object.values(array)
        arr = arr.slice(0, arr.length - 1)
        let sorted: any[] = arr.sort((a: any, b: any) => a.qtt_schedules - b.qtt_schedules)

        let highest = sorted.reverse()[0]?.qtt_schedules
        setHighestTime(Number(highest))
    }


    function checkPercentage(time: number) {

        let percentage = 0;
        if (time !== highestTime) {
            const fraction = time / highestTime;

            percentage = fraction * 100
        } else {
            percentage = 100
        }
        return percentage;
    }

    if (loading) return <p>Carregando</p>


    return (
        <div className="col-md-6 text-black mt-4">
            <div className="bg-white p-4 rounded h-100 minh-400">

                <h5>Horários mais atendidos na semana</h5>

                {highestTime == 0 ? <p className="text-danger mt-5 ">Nenhum horário nessa semana</p>
                    :

                    <div className="finance-chart d-flex flex-column mt-3 gap-3 h-90 align-items-center">
                        <div className="d-flex gap-4 align-items-end h-100">
                            {
                                timeArray?.map((item, index) => (
                                    <div key={index} className="d-flex flex-column justify-content-end gap-2 h-100">
                                        {item.qtt_schedules > 0
                                            &&
                                            <>
                                                <Tooltip className="h-100" description={`${item?.qtt_schedules} atendimentos`}>
                                                    <div role="button" style={{ height: `${checkPercentage(item?.qtt_schedules)}%` }} className={`${item.qtt_schedules === highestTime ? "bg-info time-chart-bar" : 'time-chart-bar'}`}></div>
                                                </Tooltip>
                                                <span className="text-secondary text-center">{item.hour?.slice(0, 5)}</span>
                                            </>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}

export default TimeChart;