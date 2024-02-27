import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { IEmployee, ISpecialties } from "../../interfaces";
import { useEffect, useState } from "react";
import specialtyService, { GET_ALL_SPECIALTIES } from "../../graphql/services/specialty.service";
import { changeEmployeeColor, changeEmployeeEmail, changeEmployeeName, changeEmployeePhone, changeEmployeeSpecialtyId } from "../../store/slices/employee.slice";
import userService, { GET_ALL_VETS, UPDATE_VET } from "../../graphql/services/user.service";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

const ModalEditEmployee = () => {

    const dispatch = useDispatch()

    const { employee } = useSelector((store: IStore) => store)

    const [updateMutation, { error, loading, data }] = useMutation(UPDATE_VET)
    const { data: specialties, loading: loadingSpecialties } = useQuery(GET_ALL_SPECIALTIES);

    async function updateEmployee(e) {
        e.preventDefault()

        await updateMutation({
            variables: { color: employee.color, email: employee.email, name: employee.name, phone: employee.phone, specialty_id: employee.specialty_id, id: employee.id },
            refetchQueries: [{ query: GET_ALL_VETS }]
        })

        document.getElementById("close-edit-employee-modal").click();
    }

    if (loadingSpecialties) return <p>Carregando</p>

    return (
        <div className="modal fade" id="editEmployeeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-edit-employee-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center" >Atualizar Funcionário</h1>

                        <form onSubmit={updateEmployee} className="mt-3">
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Nome</label>
                                <input required onChange={(e) => dispatch(changeEmployeeName(e.target.value))} value={employee.name} placeholder="Davi Speck" className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Especialidade</label>
                                <select className="border-orange form-control mw-400" required onChange={(e) => dispatch(changeEmployeeSpecialtyId(e.target.value))}>
                                    {
                                        specialties?.getAllSpecialties?.map(specialty => (
                                            <option selected={specialty.id == employee.specialty_id} key={specialty.id} value={specialty.id}>{specialty.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Cor</label>
                                <input required onChange={(e) => dispatch(changeEmployeeColor(e.target.value))} value={employee.color} className="border-orange form-control mw-400" type="color" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Email</label>
                                <input required onChange={(e) => dispatch(changeEmployeeEmail(e.target.value))} value={employee.email} className="border-orange form-control mw-400" type="email" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Telefone</label>
                                <input required onChange={(e) => dispatch(changeEmployeePhone(e.target.value))} value={employee.phone} className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold"> Atualizar Funcionário</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditEmployee;