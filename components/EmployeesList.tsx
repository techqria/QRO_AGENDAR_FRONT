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

    const listEmployees =  (specialty: string) => {
        return data.map((employee, index) => {
            if(specialty === employee.specialty){
                return <p className="text-black">{employee.name}</p>
            }
        })
    }

    const listSpecialty = specialty.map((specialty, index) => {
        return (
            <div className={`${!index ? 'mt-0' : 'mt-5'}`}>
                <p className="text-secondary text-capitalize text-start">{specialty}</p>
                {listEmployees(specialty)}
            </div>
        )
    })

    return <div className="mt-3 w-100">{listSpecialty}</div>
}

export default EmployeesList;