import { useEffect, useState } from "react";
import { ISchedule, ISpecialties, IVets } from "../../interfaces";
import specialtyService from "../../graphql/services/specialty.service";
import userService from "../../graphql/services/user.service";
import { paymentMethodEnum } from "../../dto/payment-method.enum";
import scheduleService from "../../graphql/services/schedule.service";

const ModalRegisterSchedule = () => {

    const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
    const [employees, setEmployees] = useState<IVets[]>([]);
    const [schedule, setSchedule] = useState<ISchedule>();

    async function registerSchedule(e) {
        e.preventDefault()

        const date = formatDateToRegister(schedule.date, schedule.hour)
        const payment = formatPriceToRegister(schedule.payment)

        const formattedSchedule = {
            ...schedule,
            date,
            payment
        }
        delete formattedSchedule.hour
        console.log(formattedSchedule)
        await scheduleService.createSchedule(formattedSchedule)
    }

    function formatPriceToRegister(payment) {
        return {
            ...payment, price: Number(payment.price.toString().replace(/\D/g, ''))
        }
    }

    function formatDateToRegister(date: string, hour: string) {
        const day = Number(date.slice(0, 2))
        const month = Number(date.slice(3, 5))
        const year = Number(date.slice(6, 10))

        const newHour = Number(hour.slice(0, 2))
        const newMinutes = Number(hour.slice(3, 5))

        const newDate = new Date(year, month - 1, day, newHour, newMinutes);
        return newDate.toString()
    }

    function formatDate(e) {
        let { value } = e.target
        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        if (value.length > 5) {
            value = `${value.slice(0, 5)}/${value.slice(5)}`;
        }
        setSchedule({ ...schedule, date: value })
    }

    function formatHour(e) {
        let { value } = e.target

        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (value.length > 2) {
            value = `${value.slice(0, 2)}:${value.slice(2)}`
        }
        setSchedule({ ...schedule, hour: value })
    }

    function formatMoney(e) {
        let { value } = e.target

        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (value.length > 0) {
            value = `R$ ${value.slice(0, value.length)}`
        }
        setSchedule({ ...schedule, payment: { ...schedule?.payment, price: value } })
    }


    useEffect(() => {
        async function getData() {
            setSpecialties(await specialtyService.getAllSpecialties())
            setEmployees(await userService.getAllEmployees())
        }

        getData()
    }, []);

    return (
        <div className="modal fade" id="registerScheduleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center" >Cadastrar Nova Agenda</h1>

                        <form onSubmit={registerSchedule} className="mt-3">
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Funcionário</label>
                                <select className="border-orange form-control mw-400" required onChange={(e) => setSchedule({ ...schedule, employee_id: e.target.value })} name="" id="">
                                    <option value="">Clique para escolher um funcionário</option>
                                    {
                                        employees?.map(employee => (
                                            <option key={employee.id} value={employee.id}>{employee.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Especialidade</label>
                                <select className="border-orange form-control mw-400" required onChange={(e) => setSchedule({ ...schedule, specialty_id: e.target.value })} name="" id="">
                                    <option value="">Clique para escolher uma especialidade</option>
                                    {
                                        specialties?.map(specialty => (
                                            <option key={specialty.id} value={specialty.id}>{specialty.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Data</label>
                                <input value={schedule?.date} onChange={formatDate} required placeholder="12/07/2024" className="border-orange form-control mw-400" maxLength={10} minLength={10} type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Horário</label>
                                <input value={schedule?.hour} maxLength={5} minLength={5} required placeholder="10:30" onChange={formatHour} className="border-orange form-control mw-400" type="text" />
                            </div>


                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Pet</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Tipo do pet</label>
                                <input required placeholder="Cachorro, gato, periquito" onChange={e => setSchedule({ ...schedule, pet_type: e.target.value })} className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Nome do pet</label>
                                <input required placeholder="Thor" onChange={e => setSchedule({ ...schedule, pet_name: e.target.value })} className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Raça do pet</label>
                                <input required placeholder="Shih-tzu" onChange={e => setSchedule({ ...schedule, pet_breed: e.target.value })} className="border-orange form-control mw-400" type="text" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Cliente</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Nome do cliente</label>
                                <input required placeholder="Roberto" onChange={e => setSchedule({ ...schedule, customer_name: e.target.value })} className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Telefone do cliente</label>
                                <input required placeholder="61999812988" onChange={e => setSchedule({ ...schedule, customer_phone: e.target.value })} className="border-orange form-control mw-400" type="text" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados de pagamento</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Valor do serviço</label>
                                <input value={schedule?.payment?.price} required placeholder="R$ 150" onChange={formatMoney} className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Método de pagamento</label>
                                <select className="border-orange form-control mw-400" required onChange={(e) => setSchedule({ ...schedule, payment: { ...schedule.payment, method: Object.values(paymentMethodEnum).find(el => el == e.target.value) } })} name="" id="">
                                    <option value="">Clique para escolher um método de pagamento</option>
                                    {
                                        Object.values(paymentMethodEnum)?.map(method => (
                                            <option key={method} value={method}>{method}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold">+ Adicionar Nova Agenda</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRegisterSchedule;