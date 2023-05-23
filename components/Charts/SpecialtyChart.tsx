import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const SpecialtyChart = () => {

    const [SpecialtyOne, setSpecialtyOne] = useState([]);
    const [SpecialtyTwo, setSpecialtyTwo] = useState([]);
    const [SpecialtyThree, setSpecialtyThree] = useState([]);
    const [highestSpecialty, setHighestSpecialty] = useState(0);

    useEffect(() => {
        const newArrayOne = new Array(8).fill({}).map(() => {
            return {
                price: Number(faker.commerce.price()),
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            }
        })

        const newArrayTwo = new Array(8).fill({}).map(() => {
            return {
                price: Number(faker.commerce.price()),
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            }
        })

        const newArrayThree = new Array(8).fill({}).map(() => {
            return {
                price: Number(faker.commerce.price()),
                date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            }
        })

        const highest = [
            newArrayOne.sort((a, b) => a.price - b.price).reverse()[0].price,
            newArrayTwo.sort((a, b) => a.price - b.price).reverse()[0].price,
            newArrayThree.sort((a, b) => a.price - b.price).reverse()[0].price,
        ].sort((a, b) => a - b).reverse()[0]

        setHighestSpecialty(highest)
        setSpecialtyOne(newArrayOne)
        setSpecialtyTwo(newArrayTwo)
        setSpecialtyThree(newArrayThree)
    }, []);

    function checkPercentage(price: number) {

        let percentage = 0;
        if (price !== highestSpecialty) {
            const fraction = price / highestSpecialty;

            percentage = fraction * 100

        } else {
            percentage = 100
        }
        return percentage;
    }

    return (
        <div className="col-md-6 text-black mt-4">
            <div className="bg-white p-4 rounded">

                <h5>Especialidades por semana</h5>

                <div className="d-flex mt-3">
                    <svg width={30} height={30}>
                        <circle cx={15} cy={12} r="10" fill="#4339F2" />
                    </svg>
                    <span>Quanto entrou</span>
                </div>

                <div className="finance-chart d-flex mt-3 gap-4">
                    <div className="d-flex flex-column text-secondary gap-5">
                        <span>{highestSpecialty}</span>
                        <span>{Math.round(highestSpecialty / 2)}</span>
                        <span>{Math.round(highestSpecialty / 3)}</span>
                        <span>{Math.round(highestSpecialty / 4)}</span>
                        <span>0</span>
                    </div>
                    <div className="d-flex gap-5 overflow-auto">
                        {
                            SpecialtyOne.map((item, index) => (
                                <div className="d-flex gap-1 align-items-end">
                                    <div style={{ height: `${checkPercentage(item.price)}%` }} className="finance-chart-bar"></div>
                                    <div style={{ height: `${checkPercentage(SpecialtyTwo[index].price)}%` }} className="bg-orange finance-chart-bar"></div>
                                    <div style={{ height: `${checkPercentage(SpecialtyThree[index].price)}%` }} className="bg-warning finance-chart-bar"></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecialtyChart;