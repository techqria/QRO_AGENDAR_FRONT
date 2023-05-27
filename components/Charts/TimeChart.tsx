import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const TimeChart = () => {

    const [timeArray, setTimeArray] = useState([]);
    const [highestTime, setHighestTime] = useState(0);

    useEffect(() => {
        const newArray = [
            {
                time: faker.date.recent(7).getHours(),
            },
            {
                time: faker.date.recent(7).getHours(),
            },
            {
                time: faker.date.recent(7).getHours(),
            },
            {
                time: faker.date.recent(7).getHours(),
            },
            {
                time: faker.date.recent(7).getHours(),
            },
            {
                time: faker.date.recent(7).getHours(),
            },
        ]
        setTimeArray(newArray)
    }, []);

    useEffect(() => {
        setHighestTime([...timeArray].sort((a,b) => a.time - b.time).reverse()[0]?.time)
    }, [timeArray]);


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

    return (
        <div className="col-md-6 text-black mt-4">
            <div className="bg-white p-4 rounded h-100 minh-400">

                <h5>Horários mais atendidos na semana</h5>

                <div className="finance-chart d-flex flex-column mt-3 gap-3 h-90 align-items-center">
                    <div className="d-flex gap-4 align-items-end h-100">
                        {
                            timeArray.map((item, index) => (
                                <div className="d-flex flex-column justify-content-end gap-2 h-100">
                                    <div style={{ height: `${checkPercentage(item.time)}%` }} className={`${item.time === highestTime ? "bg-info time-chart-bar" : 'time-chart-bar'}`}></div>
                                    <span className="text-secondary text-center">{Math.round(item.time)}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeChart;