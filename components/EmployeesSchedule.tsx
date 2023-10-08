import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import userService from "../graphql/services/user.service";

export const EmployeesSchedule = () => {

    const [EmployeesList, setEmployeesList] = useState([]);

    useEffect(() => {
        async function getData() {
            setEmployeesList(await userService.getAllEmployees())
        }

        getData()

    }, []);

    return (
        <div className="mt-4 d-flex gap-2 align-items-center">
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
        </div>
    );
}