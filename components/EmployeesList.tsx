import { useCallback } from "react"

const EmployeesList = () => {

    let data = [
        { name: 'Nome', date: '12/07/2002', hour: '08:30', specialty: 'especialidade 1' },
        { name: 'Nome', date: '12/07/2002', hour: '08:30', specialty: 'especialidade 1' },
        { name: 'Nome', date: '12/07/2002', hour: '08:30', specialty: 'especialidade 1' },
        { name: 'Segundo', date: '12/07/2002', hour: '08:30', specialty: 'especialidade 2' },
        { name: 'Segundo', date: '12/07/2002', hour: '08:30', specialty: 'especialidade 2' },
        { name: 'Segundo', date: '12/07/2002', hour: '08:30', specialty: 'especialidade 2' },
    ]

    let specialty = ['especialidade 1', 'especialidade 2']

    const listEmployees = useCallback((specialty: string) => {
        return data.map((employee, index) => {
            if (specialty === employee.specialty) {
                return (
                    <div key={index} className="d-flex align-items-center justify-content-around bg-white gap-5 ps-2 pt-4 pb-4 rounded">
                        <div className="d-flex gap-2 align-items-center">
                            <img width={40} className="rounded-circle" src="/images/person.png" alt="favicon.svg" />
                            <span className="text-black">{employee.name}</span>
                        </div>
                        <span className="text-secondary">{employee.date}</span>
                        <span className="text-secondary">{employee.hour}</span>
                        <img role="button" width={16} className="rounded-circle" src="/icons/edit-orange.svg" alt="edit-orange.svg" />
                    </div>
                )
            }
        })
    }, [data])

    const listSpecialty = specialty.map((specialty, index) => {
        return (
            <div className={`${!index ? 'mt-0' : 'mt-5'}`} key={index}>
                <p className="text-secondary text-capitalize text-start">{specialty}</p>
                {listEmployees(specialty)}
            </div>
        )
    })

    return <div className="mt-3 w-100 ">{listSpecialty}</div>
}

export default EmployeesList;