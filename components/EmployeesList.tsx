import { useCallback, useEffect, useState } from "react"
import { IEmployee, ISpecialties, IVets } from "../interfaces";
import { GET_ALL_SPECIALTIES, REMOVE_SPECIALTY } from "../graphql/services/specialty.service";
import { GET_ALL_VETS, REMOVE_VET } from "../graphql/services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { changeEmployee } from "../store/slices/employee.slice";
import { changeSpecialyId } from "../store/slices/specialty.slice";
import { IStore } from "../store/types/types";
import Tooltip from "./Tooltip";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { AuthHeader, AuthHeaderRefetch } from "../hooks/AuthHeader";
import { ToastEnum } from "../enum/toast.enum";
import { ToastMessage } from "../hooks/ToastMessage";

const EmployeesList = () => {

    const dispatch = useDispatch()

    const { data: vets, loading: loadingVets } = useQuery(GET_ALL_VETS, AuthHeader());
    const { data: specialties, loading: loadingSpecialties } = useQuery(GET_ALL_SPECIALTIES, AuthHeader());

    const [removeVetMutation] = useMutation(REMOVE_VET, AuthHeader())
    const [removeSpecialtyMutation] = useMutation(REMOVE_SPECIALTY, AuthHeader())

    if (loadingVets || loadingSpecialties) return <p>Carregando</p>

    async function removeSpecialty(specialtyId: string) {
        removeSpecialtyMutation({ variables: { id: specialtyId }, refetchQueries: [{ query: GET_ALL_SPECIALTIES, context: AuthHeaderRefetch() }] })
            .catch(e => ToastMessage(ToastEnum.info, e.message))
    }

    const setEmployee = (employee: IVets) => dispatch(changeEmployee(employee))

    const removeEmployee = async (employeeId) => { await removeVetMutation({ variables: { id: employeeId }, refetchQueries: [{ query: GET_ALL_VETS, context: AuthHeaderRefetch() }] }); }

    const listEmployees = (specialtyId: string) => {
        if (vets?.getAllVets?.find(el => el.specialty_id == specialtyId) == undefined) {
            return <p className="text-black">Nenhum veterinário cadastrado nessa especialidade</p>
        }

        return vets?.getAllVets?.map((employee, index) => {
            if (specialtyId === employee.specialty_id) {
                return (
                    <div key={index} className="d-flex align-items-center justify-content-around bg-white gap-5 ps-2 pt-4 pb-4 rounded">
                        <div className="d-flex gap-2 align-items-center">
                            {/* <img width={40} className="rounded-circle" src="/images/person.png" alt="favicon.svg" /> */}
                            <span className="text-black text-capitalize">{employee.name}</span>
                        </div>
                        <span className="text-secondary">{employee.email}</span>
                        <span className="text-secondary">{employee.phone}</span>
                        <div className="d-flex gap-2">
                            <Tooltip description="Editar usuário" >
                                <img onClick={_ => setEmployee(employee)} data-bs-toggle="modal" data-bs-target="#editEmployeeModal" role="button" width={16} className="rounded-circle" src="/icons/edit-orange.svg" alt="edit-orange.svg" />
                            </Tooltip>
                            <Tooltip description="Remover usuário" >
                                <img onClick={_ => removeEmployee(employee.id)} data-bs-toggle="modal" data-bs-target="#removeEmployee" role="button" width={16} src="/icons/trash.svg" alt="edit-orange.svg" />
                            </Tooltip>
                        </div>
                    </div>
                )
            }
        })
    }

    const listSpecialty = specialties?.getAllSpecialties?.map((specialty, index) => {
        return (
            <div className={`${!index ? 'mt-0' : 'mt-5'}`} key={index}>
                <div className="d-flex gap-2 mb-2">
                    <p className="text-secondary mb-0 text-capitalize text-start">{specialty.title}</p>
                    <Tooltip description="Remover Especialidade" >
                        <img onClick={_ => removeSpecialty(specialty.id)} role="button" width={16} src="/icons/trash.svg" alt="Ícone para remover especialidade" />
                    </Tooltip>
                </div>
                {listEmployees(specialty.id)}
            </div>
        )
    })

    return <div className="mt-3 w-100 ">{listSpecialty}</div>
}

export default EmployeesList;