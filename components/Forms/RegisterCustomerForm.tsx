import { FormEvent, useEffect, useState } from "react";
import  { CREATE_CUSTOMER, GET_CUSTOMERS } from "../../graphql/services/user.service";
import { IAdress, IAnimal, ICustomer } from "../../interfaces";
import { GenderEnum } from "../../enum/gender.enum";
import Tooltip from "../Tooltip";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ANIMAL_TYPE, GET_ANIMAL_TYPES } from "../../graphql/services/animal_type.service";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { AuthHeader, AuthHeaderRefetch } from "../../hooks/AuthHeader";

const RegisterCustomerForm = () => {

    const { userId: currentUserId } = useSelector((store: IStore) => store.user);

    const [customer, setCustomer] = useState<ICustomer>();
    const [animals, setAnimals] = useState<IAnimal[]>();
    const [NewAnimalType, setNewAnimalType] = useState("");
    const [showNewAnimalType, setShowNewAnimalType] = useState(false);

    const [createAnimalTypeMutation] = useMutation(CREATE_ANIMAL_TYPE,AuthHeader())
    const [createCustomerMutation] = useMutation(CREATE_CUSTOMER,AuthHeader())
    const { data, loading } = useQuery(GET_ANIMAL_TYPES,AuthHeader())
    const [birthdate, setBirthdate] = useState<string>('');

    async function registerCustomer(e) {
        e.preventDefault()

        if (!animals || animals.length == 0) return alert('Você deve adicionar um animal para este cliente')

        const cepResult = await (await fetch(process.env.NEXT_PUBLIC_CEP_API.replace("{CEP}", customer.adress.cep))).json()
        if (cepResult.message) return alert(cepResult.message)

        const { service, street, ...adressFormatted } = cepResult
        const adress: IAdress = {...adressFormatted, additionalInfo: ""}

        const birthDateFormatted = `${birthdate.slice(3, 5)}/${birthdate.slice(0, 2)}/${birthdate.slice(6, birthdate.length)}`

        await createCustomerMutation({
            variables: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                password: customer.password,
                image_url: customer.image_url || "a",
                birthdate: birthDateFormatted,
                adress,
                animals: animals,
            },
            refetchQueries: [{query: GET_CUSTOMERS, context: AuthHeaderRefetch()}]
        })
        document.getElementById("close-register-customer-modal").click();
    }

    function insertNewAnimal() {
        const initialStateAnimal: IAnimal = {
            breed: "", color: "", gender: GenderEnum.male,
            name: "", neutered: false,
            typeAnimalId: data.getAllAnimalTypes[0].id,
            userId: currentUserId, avatar: ""
        }

        !animals || animals?.length == 0
            ? setAnimals([initialStateAnimal])
            : setAnimals([...animals, initialStateAnimal])
    }

    function removeAnimal(index: number) {
        animals.length == 1
            ? setAnimals([])
            : setAnimals(animals.slice(index, index + 1))
    }

    function updateAnimal(field: string, index: number, value: string) {
        const arr = [...animals]
        const currentAnimal = { ...arr[index] }

        currentAnimal[field] = value
        arr[index] = currentAnimal

        setAnimals(arr)
    }

    async function createAnimalType() {
        await createAnimalTypeMutation({ variables: { name: NewAnimalType }, refetchQueries: [{ query: GET_ANIMAL_TYPES,context: AuthHeaderRefetch() }] })
        setNewAnimalType("")
        setShowNewAnimalType(false)
    }

    function formatDateInput(value: string) {
        const inputValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        const day = inputValue.slice(0, 2);
        const month = inputValue.slice(2, 4);
        const year = inputValue.slice(4, 8);
        let formattedValue = '';

        if (inputValue.length > 4) formattedValue = `${day}/${month}/${year}`;
        else if (inputValue.length > 2) formattedValue = `${day}/${month}`;
        else formattedValue = day;

        setBirthdate(formattedValue);
    }

    if (loading) return <p className="text-black">Carregando</p>

    return (
        <form onSubmit={registerCustomer} className="mt-3">
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required placeholder="Davi Speck" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Telefone</label>
                <input maxLength={11} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} required placeholder="61 988229999" className="border-orange form-control mw-400" type="tel" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Email</label>
                <input onChange={(e) => setCustomer({ ...customer, email: e.target.value })} required placeholder="davispeck@mail.com" className="border-orange form-control mw-400" type="email" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Senha</label>
                <input onChange={(e) => setCustomer({ ...customer, password: e.target.value })} required placeholder="Insira sua senha" className="border-orange form-control mw-400" type="password" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">CEP</label>
                <input onChange={(e) => setCustomer({ ...customer, adress: { ...customer.adress, cep: e.target.value } })} required placeholder="Insira seu CEP" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Data de Nascimento</label>
                <input value={birthdate || ""} onChange={(e) => formatDateInput(e.target.value)} required placeholder="Insira sua data de nascimento" className="border-orange form-control mw-400" type="text" />
            </div>
            {
                (animals && animals?.length > 0) && <h1 className="fs-5 text-orange text-center mt-5">Cadastrar pet</h1>
            }
            {
                animals?.map((animal, index) =>
                    <div key={index}>
                        <div className="mb-3 d-flex justify-content-end ">
                            <button onClick={() => removeAnimal(index)} className="btn btn-default text-danger fw-semibold mt-1 ">X Remover pet</button>
                        </div>
                        <div className="mb-3 d-flex justify-content-evenly">
                            <label className="w-20 text-black">Nome</label>
                            <input onChange={(e) => updateAnimal("name", index, e.target.value)} required placeholder="Thor" className="border-orange form-control mw-400" type="text" />
                        </div>
                        <div className="mb-3 d-flex justify-content-evenly">
                            <label className="w-20 text-black">Sexo</label>
                            <div className="mw-400 d-flex gap-3 form-control border-0">
                                <div className="mb-3 d-flex gap-1">
                                    <label className="text-black" >Macho</label>
                                    <input checked onChange={(e) => updateAnimal("gender", index, e.target.value)} required placeholder="Tipo" value={GenderEnum.male} name="gender" type="radio" />
                                </div>
                                <div className="mb-3 d-flex gap-1">
                                    <label className="text-black" >Fêmea</label>
                                    <input onChange={(e) => updateAnimal("gender", index, e.target.value)} required placeholder="Tipo" value={GenderEnum.female} name="gender" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-evenly">
                            <label className="w-20 text-black">Raça</label>
                            <input onChange={(e) => updateAnimal("breed", index, e.target.value)} required placeholder="Pitbull" className="border-orange form-control mw-400" type="text" />
                        </div>
                        <div className="mb-3 d-flex justify-content-evenly">
                            <label className="w-20 text-black">Cor</label>
                            <input onChange={(e) => updateAnimal("color", index, e.target.value)} required placeholder="Tigrado" className="border-orange form-control mw-400" type="text" />
                        </div>
                        <div className="mb-3 d-flex justify-content-evenly">
                            <label className="w-20 text-black d-flex gap-2 align-items-center">
                                Tipo
                                <Tooltip description="Criar novo tipo">
                                    <button onClick={() => setShowNewAnimalType(!showNewAnimalType)} className="btn btn-default text-orange fs-4 p-0 m-0 fw-bold">+</button>
                                </Tooltip>
                            </label>
                            <select onChange={(e) => updateAnimal("typeAnimalId", index, e.target.value)} className="form-control mw-400 border-orange" name="" id="">
                                {
                                    data?.getAllAnimalTypes?.map((animalType, index) =>
                                        <option key={index} value={animalType.id}>{animalType.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        {showNewAnimalType &&
                            <div className="mb-3 d-flex justify-content-evenly">
                                <div className="d-flex gap-2 w-20 align-items-center">
                                    <label className="text-secondary">Nova especialidade</label>
                                    <Tooltip description="Cancelar">
                                        <span role="button" onClick={() => { setShowNewAnimalType(!showNewAnimalType); setNewAnimalType("") }} className="text-danger fs-5 p-0 m-0 fw-bold">x</span>
                                    </Tooltip>
                                </div>
                                <div className="mw-400 form-control border-0 d-flex flex-column">
                                    <input onChange={(e) => setNewAnimalType(e.target.value)} placeholder="Insira o nome do nome tipo de animal" required className="border-orange form-control mw-400" type="text" />
                                    <button onClick={createAnimalType} className="btn btn-default p-0 d-flex align-self-end  text-orange">Criar</button>
                                </div>
                            </div>
                        }
                        <div className="mb-3 d-flex justify-content-evenly">
                            <label className="w-20 text-black">Castrado</label>
                            <div className="mw-400 d-flex gap-3 form-control border-0">
                                <div className="mb-3 d-flex gap-1">
                                    <label className="text-black" >Sim</label>
                                    <input onChange={(e) => updateAnimal("neutered", index, e.target.value)} required value="true" name="neutered" type="radio" />
                                </div>
                                <div className="mb-3 d-flex gap-1">
                                    <label className="text-black" >Não</label>
                                    <input checked onChange={(e) => updateAnimal("neutered", index, e.target.value)} required value="false" name="neutered" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-evenly">
                            <label className="w-20 text-black">Avatar</label>
                            <div className="mw-400 d-flex gap-3 form-control border-0 align-items-center">
                                <div className="mb-3 d-flex gap-1">
                                    <label className="text-black" >
                                        <img src="/icons/cat-icon.svg" alt="gato" />
                                    </label>
                                    <input onChange={(e) => updateAnimal("avatar", index, e.target.value)} required placeholder="Tipo" value="/icons/cat-icon.svg" name="avatar" type="radio" />
                                </div>
                                <div className="mb-3 d-flex gap-1">
                                    <label className="text-black" >
                                        <img src="/icons/dog-icon.svg" alt="cachorro" />
                                    </label>
                                    <input onChange={(e) => updateAnimal("avatar", index, e.target.value)} required placeholder="Tipo" value="/icons/dog-icon.svg" name="avatar" type="radio" />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="mb-3 d-flex justify-content-center">
                <button onClick={insertNewAnimal} className="btn btn-orange mt-5 rounded fw-bold">
                    {
                        !animals || animals?.length == 0
                            ? 'Adicionar Animal'
                            : 'Adicionar Outro Animal'
                    }
                </button>
            </div>

            <div className="mb-3 d-flex justify-content-center gap-3">
                <button id="close-register-customer-modal" type="button" data-bs-dismiss="modal" aria-label="Close" className=" btn btn-orange opacity-50 mt-5 rounded fw-bold">Cancelar</button>
                <button type="submit" className="btn btn-orange mt-5 rounded fw-bold">Confirmar</button>
            </div>
        </form>
    );
}

export default RegisterCustomerForm;