import EditPetForm from "../Forms/EditPetForm";

const ModalEditPet = () => {

    return (
        <div className="modal fade" id="editPetModal"  tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-edit-pet-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center">Atualizar dados do Pet</h1>
                        <EditPetForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditPet;