import RegisterSpecialtyForm from "../Forms/RegisterSpecialtyForm";

const ModalRegisterSpecialty = () => {

    return (
        <div className="modal fade" id="registerSpecialtyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-register-modal-specialty" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-start" >+ Nova Especialidade</h1>
                        <RegisterSpecialtyForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRegisterSpecialty;