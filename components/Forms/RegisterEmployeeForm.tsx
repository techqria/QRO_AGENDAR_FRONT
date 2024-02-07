import { useEffect, useState } from "react";
import { IEmployee, ISpecialties } from "../../interfaces";
import userService from "../../graphql/services/user.service";
import specialtyService from "../../graphql/services/specialty.service";

const RegisterEmployeeForm = () => {

    const [employee, setEmployee] = useState<IEmployee>();
    const [specialties, setSpecialties] = useState<ISpecialties[]>([]);

    async function registerEmployee(e) {
        e.preventDefault()
        userService.createEmployee(employee)
        document.getElementById("close-register-modal").click();
    }

    async function getSpecialties() {
        const result = await specialtyService.getAllSpecialties()
        setSpecialties(result)
        setEmployee({...employee, specialty: result[0].id})
    }

    useEffect(() => {
        getSpecialties()
    }, []);

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
                <label className="w-20 text-black">Especialidade</label>
                <select className="border-orange form-control mw-400"  required onChange={(e) => setEmployee({ ...employee, specialty: e.target.value })} name="" id="">
                    {
                        specialties?.map(specialty => (
                            <option key={specialty.id} value={specialty.id}>{specialty.title}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Cor</label>
                <input onChange={(e) => setEmployee({ ...employee, color: e.target.value })} required className="border-orange form-control mw-400" type="color" />
            </div>
            {/* <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Imagem</label>
                <input onChange={(e) => setEmployee({ ...employee, imageUrl: e.target.value })} className="border-orange form-control mw-400" type="file" />
            </div> */}
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold">Salvar</button>
            </div>
        </form>
    );
}

export default RegisterEmployeeForm;