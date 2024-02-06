import { useEffect, useState } from "react";
import dashboardService from "../../graphql/services/dashboard.service";

const FinanceChart = () => {

    const [annualRevenue, setAnnualRevenue] = useState([]);
    const [highestPrice, setHighestPrice] = useState(0);

    useEffect(() => {
        async function getData() {
            const financeValues = await dashboardService.getDashboardFinanceChart()
            let arr = Object.values(financeValues)
            arr = arr.slice(0, arr.length - 1)

            setAnnualRevenue(arr)
            setHighestPrice(arr.sort((a: any, b: any) => a - b).reverse()[0] as number)
        }
        getData()
    }, []);

    function checkPercentage(price: number) {

        let percentage = 0;
        if (price !== highestPrice) {
            const fraction = price / highestPrice;

            percentage = fraction * 100

        } else {
            percentage = 100
        }
        return percentage;
    }

    return (
        <div className="col-md-6 text-black ">
            <div className="bg-white p-4 rounded">

                <h5>Financeiro</h5>

                <div className="d-flex mt-3">
                    <svg width={30} height={30}>
                        <circle cx={15} cy={12} r="10" fill="#4339F2" />
                    </svg>
                    <span>Quanto entrou</span>
                </div>

                {highestPrice == 0 ? <p className="text-danger mt-5 ">Nenhum valor entrou nessa semana</p>
                    :

                    <div className="finance-chart d-flex mt-3 gap-3">
                        <div className="d-flex flex-column text-secondary gap-5">
                            <span>{highestPrice}</span>
                            <span>{Math.round(highestPrice / 2)}</span>
                            <span>{Math.round(highestPrice / 3)}</span>
                            <span>{Math.round(highestPrice / 4)}</span>
                            <span>0</span>
                        </div>
                        <div className="d-flex gap-2 align-items-end">
                            {
                                annualRevenue?.map((item, index) => (
                                    <div key={index} style={{ height: `${checkPercentage(item)}%` }} className="finance-chart-bar"></div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}

export default FinanceChart;