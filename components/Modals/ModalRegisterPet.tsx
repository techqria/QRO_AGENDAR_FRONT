import RegisterPetForm from "../Forms/RegisterPetForm";

const ModalRegisterPet = () => {

    return (
        <div className="modal fade" id="registerPetModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-register-pet-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-start">Cadastrar Novo Pet</h1>
                        <RegisterPetForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRegisterPet;