import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export const EmployeesSchedule = () => {

    const [EmployeesList, setEmployeesList] = useState([]);

    useEffect(() => {
        const newArray = new Array(4).fill({}).map(_ => {
            return {
                name: faker.name.firstName(),
                color: faker.color.rgb()
            }
        })

        setEmployeesList(newArray)
    }, []);

    return (
        <div className="mt-4 d-flex gap-2 align-items-center">
            <img role="button" width={30} src="/icons/arrow-left.svg" alt="arrow-left.svg" />
            <div className="d-flex gap-5">
                {
                    EmployeesList.map(el => (
                        <div className="d-flex gap-1 align-items-center">
                            <img style={{ borderStyle: 'solid', borderWidth: 3, borderColor: el.color }} className="rounded-circle" width={60} src="/images/person.png" alt="" />
                            <h6 style={{ color: el.color }} className="m-0 text-capitalize">{el.name}</h6>
                        </div>
                    ))
                }
            </div>
            <img role="button" width={30} src="/icons/arrow-right.svg" alt="arrow-left.svg" />
        </div>
    );
}