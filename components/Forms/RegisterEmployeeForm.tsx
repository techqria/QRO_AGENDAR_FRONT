import { useEffect, useState } from "react";
import { IEmployee, ISpecialties } from "../../interfaces";
import  { CREATE_VET, GET_ALL_VETS } from "../../graphql/services/user.service";
import  { CREATE_SPECIALTY, GET_ALL_SPECIALTIES } from "../../graphql/services/specialty.service";
import Tooltip from "../Tooltip";
import { useMutation, useQuery } from "@apollo/client";
import { AuthHeader, AuthHeaderRefetch } from "../../hooks/AuthHeader";

const RegisterEmployeeForm = () => {

    const [employee, setEmployee] = useState<IEmployee>();
    const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
    const [newSpecialty, setNewSpecialty] = useState("");
    const [showNewSpecialty, setShowNewSpecialty] = useState(false);

    const [createEmployeeMutation] = useMutation(CREATE_VET,AuthHeader())
    const [createSpecialtyMutation] = useMutation(CREATE_SPECIALTY,AuthHeader())

    async function registerEmployee(e) {
        e.preventDefault()
        if (showNewSpecialty && newSpecialty.length > 0) {
            employee.specialty = (await createSpecialtyMutation({ variables: { title: newSpecialty } }) as any).id 
        }

        await createEmployeeMutation({
            variables: { name: employee.name, email: employee.email, phone: employee.phone, password: employee.password, specialty: employee.specialty, color: employee.color ?? "#000000", imageUrl: employee.imageUrl ?? "" },
            refetchQueries: [{ query: GET_ALL_VETS, context: AuthHeaderRefetch() }]
        })

        document.getElementById("close-register-modal-employee").click();
    }

    const { data, loading } = useQuery(GET_ALL_SPECIALTIES,AuthHeader());


    useEffect(() => {
        if (data) {
            const result = data.getAllSpecialties
            console.log(result)
            setSpecialties(result)
            setEmployee({ ...employee, specialty: result[0]?.id })
        }
    }, [data]);

    if(loading) return <p>Carregando</p>

    if(specialties.length == 0) return <p>Para cadastrar um novo colaborador, é necessário cadastrar uma especialidade</p>

    return (
        <form onSubmit={registerEmployee} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input onChange={(e) => setEmployee({ ...employee, name: e.target.value })} required placeholder="Davi Speck" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Email</label>
                <input onChange={(e) => setEmployee({ ...employee, email: e.target.value })} required placeholder="davispeck@mail.com" className="border-orange form-control mw-400" type="email" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Telefone</label>
                <input maxLength={11} onChange={(e) => setEmployee({ ...employee, phone: e.target.value })} required placeholder="61 988229999" className="border-orange form-control mw-400" type="tel" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Senha</label>
                <input onChange={(e) => setEmployee({ ...employee, password: e.target.value })} required placeholder="Insira sua senha" className="border-orange form-control mw-400" type="password" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <div className="d-flex gap-2 w-20 align-items-center">
                    <label className="text-black">Especialidade</label>
                    <Tooltip description="Criar nova especialidade">
                        <button onClick={() => setShowNewSpecialty(!showNewSpecialty)} className="btn btn-default text-orange fs-4 p-0 m-0 fw-bold">+</button>
                    </Tooltip>
                </div>
                {showNewSpecialty
                    ? <input value={newSpecialty} disabled className="border-orange form-control mw-400" type="text" />
                    : <select className="border-orange form-control mw-400" required onChange={(e) => setEmployee({ ...employee, specialty: e.target.value })} name="" id="">
                        {
                            specialties?.map(specialty => (
                                <option key={specialty.id} value={specialty.id}>{specialty.title}</option>
                            ))
                        }
                    </select>}
            </div>
            {showNewSpecialty &&
                <div className="mb-3 d-flex justify-content-evenly">
                    <div className="d-flex gap-2 w-20 align-items-center">
                        <label className="text-secondary">Novo tipo</label>
                        <Tooltip description="Cancelar">
                            <span role="button" onClick={() => { setShowNewSpecialty(!showNewSpecialty); setNewSpecialty("") }} className="text-danger fs-5 p-0 m-0 fw-bold">x</span>
                        </Tooltip>
                    </div>
                    <input onChange={(e) => setNewSpecialty(e.target.value)} placeholder="Insira o nome da nova especialidade" required className="border-orange form-control mw-400" type="text" />
                    <span className="text-end text-orange">Criar</span>
                </div>
            }
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Cor</label>
                <input onChange={(e) => setEmployee({ ...employee, color: e.target.value })} required className="border-orange form-control mw-400" type="color" />
            </div>
            {/* <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Imagem</label>
                <input onChange={(e) => setEmployee({ ...employee, imageUrl: e.target.value })} className="border-orange form-control mw-400" type="file" />
            </div> */}
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold">Salvar</button>
            </div>
        </form>
    );
}

export default RegisterEmployeeForm;