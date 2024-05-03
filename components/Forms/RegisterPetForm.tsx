import { FormEvent, useEffect, useState } from "react";
import { IAnimal } from "../../interfaces";
import { GenderEnum } from "../../enum/gender.enum";
import Tooltip from "../Tooltip";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ANIMAL_TYPE, GET_ANIMAL_TYPES } from "../../graphql/services/animal_type.service";
import { AuthHeader, AuthHeaderRefetch } from "../../hooks/AuthHeader";
import { ToastMessage } from "../../hooks/ToastMessage";
import { ToastEnum } from "../../enum/toast.enum";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { CREATE_ANIMAL } from "../../graphql/services/animal.service";
import { GET_CUSTOMERS } from "../../graphql/services/user.service";

const RegisterPetForm = () => {

    const { customerId } = useSelector((store: IStore) => store.customer)

    const [animal, setAnimal] = useState<IAnimal>();
    const [NewAnimalType, setNewAnimalType] = useState("");
    const [showNewAnimalType, setShowNewAnimalType] = useState(false);

    const { data, loading } = useQuery(GET_ANIMAL_TYPES, AuthHeader())
    const [createAnimalTypeMutation] = useMutation(CREATE_ANIMAL_TYPE, AuthHeader())
    const [createAnimalMutation] = useMutation(CREATE_ANIMAL, AuthHeader())

    async function createAnimalType() {
        await createAnimalTypeMutation({ variables: { name: NewAnimalType }, refetchQueries: [{ query: GET_ANIMAL_TYPES, context: AuthHeaderRefetch() }] })
        setNewAnimalType("")
        setShowNewAnimalType(false)
        ToastMessage(ToastEnum.success, "Tipo criado com sucesso")
    }

    async function registerAnimalToCustomer(e: FormEvent) {
        e.preventDefault()

        createAnimalMutation({
            variables: {
                userId: customerId, name: animal.name, gender: animal.gender,
                breed: animal.breed, color: animal.color, typeAnimalId: animal.typeAnimalId,
                neutered: animal.neutered, avatar: animal.avatar,
            },
            refetchQueries: [{ query: GET_CUSTOMERS, context: AuthHeaderRefetch() }]
        }).then(_ => {
            ToastMessage(ToastEnum.success, "Pet criado com sucesso")
            document.getElementById('close-register-pet-modal').click()
        })
    }

    useEffect(() => {
        //Inserindo gênero e tipo do animal assim que o componente é montado 
        if (data) setAnimal({ ...animal, gender: GenderEnum.male, typeAnimalId: data.getAllAnimalTypes[0].id, neutered: false })
    }, [data]);

    if (loading) return <p className="text-black">Carregando</p>

    return (
        <form onSubmit={registerAnimalToCustomer}>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Nome</label>
                <input onChange={(e) => setAnimal({ ...animal, name: e.target.value })} required placeholder="Thor" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Sexo</label>
                <div className="mw-400 d-flex gap-3 form-control border-0">
                    <div className="mb-3 d-flex gap-1">
                        <label className="text-black" >Macho</label>
                        <input checked={animal.gender == GenderEnum.male} onChange={(e) => setAnimal({ ...animal, gender: e.target.value })} required value={GenderEnum.male} name="gender" type="radio"/>
                    </div>
                    <div className="mb-3 d-flex gap-1">
                        <label className="text-black" >Fêmea</label>
                        <input checked={animal.gender == GenderEnum.female} onChange={(e) => setAnimal({ ...animal, gender: e.target.value })} required value={GenderEnum.female} name="gender" type="radio"/>
                    </div>
                </div>
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Raça</label>
                <input onChange={(e) => setAnimal({ ...animal, breed: e.target.value })} required placeholder="Pitbull" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black">Cor</label>
                <input onChange={(e) => setAnimal({ ...animal, color: e.target.value })} required placeholder="Tigrado" className="border-orange form-control mw-400" type="text" />
            </div>
            <div className="mb-3 d-flex justify-content-evenly">
                <label className="w-20 text-black d-flex gap-2 align-items-center">
                    Tipo
                    <Tooltip description="Criar novo tipo">
                        <button onClick={() => setShowNewAnimalType(!showNewAnimalType)} className="btn btn-default text-orange fs-4 p-0 m-0 fw-bold">+</button>
                    </Tooltip>
                </label>
                <select onChange={(e) => setAnimal({ ...animal, typeAnimalId: e.target.value })} className="form-control mw-400 border-orange" name="animalType" id="animalType">
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
                        <label className="text-secondary">Novo Tipo</label>
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
                        <input checked={animal.neutered} onChange={(e) => setAnimal({ ...animal, neutered: Boolean(e.target.value) })} required value={1} name="neutered" type="radio" />
                    </div>
                    <div className="mb-3 d-flex gap-1">
                        <label className="text-black" >Não</label>
                        <input checked={!animal.neutered} onChange={(e) => setAnimal({ ...animal, neutered: Boolean(e.target.value) })} required value={0} name="neutered" type="radio" />
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
                        <input onChange={(e) => setAnimal({ ...animal, avatar: e.target.value })} required placeholder="Tipo" value="/icons/cat-icon.svg" name="avatar" type="radio" />
                    </div>
                    <div className="mb-3 d-flex gap-1">
                        <label className="text-black" >
                            <img src="/icons/dog-icon.svg" alt="cachorro" />
                        </label>
                        <input onChange={(e) => setAnimal({ ...animal, avatar: e.target.value })} required placeholder="Tipo" value="/icons/dog-icon.svg" name="avatar" type="radio" />
                    </div>
                </div>
            </div>

            <div className="mb-3 d-flex justify-content-center gap-3">
                <button id="close-register-customer-modal" type="button" data-bs-dismiss="modal" aria-label="Close" className=" btn btn-orange opacity-50 rounded fw-bold">Cancelar</button>
                <button type="submit" className="btn btn-orange rounded fw-bold">Confirmar</button>
            </div>
        </form>
    )
}

export default RegisterPetForm;