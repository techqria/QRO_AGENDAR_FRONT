import { FormEvent, useEffect, useState } from "react";
import { IPetsList, ISchedule, } from "../../interfaces";
import { GET_ALL_SPECIALTIES } from "../../graphql/services/specialty.service";
import { GET_ALL_VETS, GET_CUSTOMERS, GET_VET_BY_ID } from "../../graphql/services/user.service";
import { paymentMethodEnum } from "../../enum/payment-method.enum";
import { CREATE_SCHEDULE, GET_SCHEDULES_CALENDAR } from "../../graphql/services/schedule.service";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { AuthHeader, AuthHeaderRefetch } from "../../hooks/AuthHeader";
import { ToastMessage } from "../../hooks/ToastMessage";
import { ToastEnum } from "../../enum/toast.enum";

const ModalRegisterSchedule = () => {

    const [schedule, setSchedule] = useState<ISchedule>();
    const [petsList, setPetsList] = useState<IPetsList[]>();

    const [createScheduleMutation] = useMutation(CREATE_SCHEDULE, AuthHeader())
    const [getVetQuery] = useLazyQuery(GET_VET_BY_ID, AuthHeader())

    const { data: vets, loading: loadingVets } = useQuery(GET_ALL_VETS, AuthHeader());
    const { data: specialties, loading: loadingSpecialties } = useQuery(GET_ALL_SPECIALTIES, AuthHeader());
    const { data: customers, loading: loadingCustomers } = useQuery(GET_CUSTOMERS, AuthHeader());

    async function registerSchedule(e: FormEvent) {
        e.preventDefault()

        const date = formatDateToRegister(schedule.date, schedule.hour)
        const payment = formatPriceToRegister(schedule.payment)

        const formattedSchedule = {
            ...schedule,
            date,
            payment
        }
        delete formattedSchedule.hour

        await createScheduleMutation({
            variables: {
                specialty_id: formattedSchedule.specialty_id, employee_id: formattedSchedule.employee_id,
                date: formattedSchedule.date, customer_name: formattedSchedule.customer_name,
                customer_phone: formattedSchedule.customer_phone, method: formattedSchedule.payment.method,
                price: formattedSchedule.payment.price, pet_breed: formattedSchedule.pet_breed, pet_name: formattedSchedule.pet_name,
                pet_type: formattedSchedule.pet_type, text: formattedSchedule.text ?? ''
            },
            refetchQueries: [{ query: GET_SCHEDULES_CALENDAR,context: AuthHeaderRefetch() }],
        }).catch(e => ToastMessage(ToastEnum.warning,e.message))

        clearFormData()
        closeModal()
    }

    function clearFormData() {
        setSchedule(
            {
                customer_name: '', customer_phone: '', date: '',
                employee_id: '', hour: '',
                payment: { method: paymentMethodEnum.money, price: 0 },
                pet_breed: '', pet_name: '', pet_type: '', specialty_id: '',
                text: ''
            }
        )
        setPetsList([])
    }

    function closeModal() {
        document.getElementById('close-register-schedule-modal').click()
    }

    function formatPriceToRegister(payment) {
        return {
            ...payment,
            price: Number(payment.price.toString().replace(/\D/g, ''))
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

    async function setSpecialtyByVet(employee_id: string) {
        const { data } = await getVetQuery({ variables: { id: employee_id } })
        if (data) setSchedule({ ...schedule, specialty_id: data.getUserById.specialty_id, employee_id })
    }

    function selectCustomer(customerId: string) {
        if (customerId) {
            const currentUser = customers.getAllCustomers.find(el => el.id == customerId)
            setSchedule({ ...schedule, customer_phone: currentUser.phone, customer_name: currentUser.name })
            setPetsList(currentUser.animals)
        } else setPetsList([])
    }

    function selectPet(pet_name: string) {
        const currentPet = petsList.find(el => el.name == pet_name)
        setSchedule({ ...schedule, pet_name: currentPet.name, pet_breed: currentPet.breed, pet_gender: currentPet.gender, pet_neutered: currentPet.neutered, pet_type: currentPet.typeAnimalId })
    }

    useEffect(() => {
        petsList?.length > 0 && selectPet(petsList[0].name)
    }, [petsList]);

    if (loadingVets || loadingSpecialties || loadingCustomers) return <p className="text-black">Carregando</p>

    return (
        <div className="modal fade" id="registerScheduleModal"  tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-register-schedule-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-start" >Cadastrar Nova Agenda</h1>

                        <form onSubmit={registerSchedule} className="mt-3">
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Funcionário</label>
                                <select className="border-orange form-control mw-400" required onChange={(e) => {
                                    setSpecialtyByVet(e.target.value)
                                }}
                                    name="" id="">
                                    <option value="">Clique para escolher um funcionário</option>
                                    {
                                        vets.getAllVets?.map(employee => (
                                            <option key={employee.id} value={employee.id}>{employee.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Especialidade</label>
                                <input type="text" defaultValue={specialties?.getAllSpecialties?.filter(el => el.id == schedule?.specialty_id)[0]?.title} className="form-control mw-400" disabled />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Data</label>
                                <input value={schedule?.date} onChange={formatDate} required placeholder="12/07/2024" className="border-orange form-control mw-400" maxLength={10} minLength={10} type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Horário</label>
                                <input value={schedule?.hour} maxLength={5} minLength={5} required placeholder="10:30" onChange={formatHour} className="border-orange form-control mw-400" type="text" />
                            </div>

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Cliente</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Cliente</label>
                                <select className="border-orange form-control mw-400" required onChange={(e) => {
                                    setSchedule({ ...schedule, customer_name: e.target.value })
                                    selectCustomer(e.target.value)
                                }}>
                                    <option value="">Clique para escolher um cliente</option>
                                    {
                                        customers.getAllCustomers?.map(customer => (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Dados do Pet</h2>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Nome</label>
                                <select className="border-orange form-control mw-400" required onChange={(e) => selectPet(e.target.value)}>
                                    {!petsList || petsList?.length == 0
                                        ? <option value="Selecione um cliente">Selecione um cliente</option>
                                        : petsList?.map(pet => (
                                            <option key={pet.name} value={pet.name}>{pet.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {
                                schedule?.pet_name &&
                                <>
                                    <div className="mb-3 d-flex justify-content-evenly">
                                        <label className="w-20 text-black">Raça</label>
                                        <input value={schedule?.pet_breed} maxLength={5} minLength={5} required placeholder="10:30" disabled className="border-orange form-control mw-400" type="text" />
                                    </div>
                                    <div className="mb-3 d-flex justify-content-evenly">
                                        <label className="w-20 text-black">Genêro</label>
                                        <input value={schedule?.pet_gender} maxLength={5} minLength={5} required placeholder="10:30" disabled className="border-orange form-control mw-400" type="text" />
                                    </div>
                                    <div className="mb-3 d-flex justify-content-evenly">
                                        <label className="w-20 text-black">Castrado?</label>
                                        <input value={schedule?.pet_neutered ? 'Sim' : 'Não'} maxLength={5} minLength={5} required placeholder="10:30" disabled className="border-orange form-control mw-400" type="text" />
                                    </div>
                                </>
                            }

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

                            <h2 className="fs-5 text-black text-center fw-normal mt-5 mb-4">Informações adicionais</h2>
                            <div className="mb-3 d-flex justify-content-center">
                                <textarea value={schedule?.text} onChange={(e) => setSchedule({ ...schedule, text: e.target.value })} className="border-orange form-control mw-80"></textarea>
                            </div>

                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRegisterSchedule;