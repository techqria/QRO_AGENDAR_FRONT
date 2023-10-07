import { useCallback, useEffect, useState } from "react"
import { IEmployee, ISpecialties, IVets } from "../interfaces";
import specialtyService from "../graphql/services/specialty.service";
import userService from "../graphql/services/user.service";
import { useDispatch } from "react-redux";
import { changeEmployee } from "../store/slices/employee.slice";
import { changeSpecialyId } from "../store/slices/specialty.slice";

const EmployeesList = () => {

    const dispatch = useDispatch()

    const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
    const [vets, setVets] = useState<IVets[]>([])

    useEffect(() => {
        async function getData() {
            const result = await specialtyService.getAllSpecialties()
            setSpecialties(result)

            const resultVets = await userService.getAllEmployees()
            setVets(resultVets)
        }

        getData()
    }, [])

    const setEpecialty = (id: string) => dispatch(changeSpecialyId(id))

    const setEmployee = (employee: IVets) => dispatch(changeEmployee(employee))

    const listEmployees = useCallback((specialtyId: string) => {
        if (vets?.find(el => el.specialty_id == specialtyId) == undefined) {
            return <p className="text-black">Nenhum veterinário cadastrado nessa especialidade</p>
        }

        return vets?.map((employee, index) => {
            if (specialtyId === employee.specialty_id) {
                return (
                    <div key={index} className="d-flex align-items-center justify-content-around bg-white gap-5 ps-2 pt-4 pb-4 rounded">
                        <div className="d-flex gap-2 align-items-center">
                            {/* <img width={40} className="rounded-circle" src="/images/person.png" alt="favicon.svg" /> */}
                            <span className="text-black text-capitalize">{employee.name}</span>
                        </div>
                        <span className="text-secondary">{employee.email}</span>
                        <span className="text-secondary">{employee.phone}</span>
                        <img onClick={_ => setEmployee(employee)} data-bs-toggle="modal" data-bs-target="#editEmployeeModal" role="button" width={16} className="rounded-circle" src="/icons/edit-orange.svg" alt="edit-orange.svg" />
                    </div>
                )
            }
        })
    }, [vets])

    const listSpecialty = specialties?.map((specialty, index) => {
        return (
            <div className={`${!index ? 'mt-0' : 'mt-5'}`} key={index}>
                <div className="d-flex gap-2 mb-2">
                    <p className="text-secondary mb-0 text-capitalize text-start">{specialty.title}</p>
                    <img onClick={_ => setEpecialty(specialty.id)} data-bs-toggle="modal" data-bs-target="#editSpecialtyModal" role="button" width={16} className="rounded-circle" src="/icons/edit-orange.svg" alt="edit-orange.svg" />
                </div>
                {listEmployees(specialty.id)}
            </div>
        )
    })

    return <div className="mt-3 w-100 ">{listSpecialty}</div>
}

export default EmployeesList;