import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const FinanceChart = () => {

    const [moneyArray, setMoneyArray] = useState([]);
    const [highestPrice, setHighestPrice] = useState(0);

    useEffect(() => {
        const newArray = [
            {
                price: 1300,
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            },
            {
                price: 900,
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            },
            {
                price: 900,
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            },
            {
                price: 500,
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            },
            {
                price: 230,
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            },
        ]

        setHighestPrice(newArray.sort((a, b) => a.price - b.price).reverse()[0].price)
        setMoneyArray(newArray)
    }, []);

    function checkPercentage(price: number) {

        let percentage = 0;
        if (price !== highestPrice) {
            const fraction = price / highestPrice;

            const format = fraction * 100

            percentage = 100 / format;
        } else {
            percentage = 100
        }
        return percentage;
    }

    return (
        <div className="col-md-6 bg-white d-flex flex-column text-black p-4 rounded">
            <h5>Financeiro</h5>

            <div className="d-flex mt-3">
                <svg width={30} height={30}>
                    <circle cx={15} cy={12} r="10" fill="#4339F2" />
                </svg>
                <span>Quanto entrou</span>
            </div>

            <div className="finance-chart d-flex mt-3">
                <div className="d-flex flex-column text-secondary gap-5">
                    <span>{highestPrice}</span>
                    <span>{Math.round(highestPrice / 2)}</span>
                    <span>{Math.round(highestPrice / 3)}</span>
                    <span>{Math.round(highestPrice / 4)}</span>
                    <span>0</span>
                </div>
                <div className="d-flex gap-2 align-items-end">
                    {
                        moneyArray.map((item, index) => (
                            <div style={{ height: `${checkPercentage(item.price)}%` }} className="finance-chart-bar"></div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FinanceChart;