
import RegisterCustomerForm from "../Forms/RegisterCustomerForm";

const ModalRegisterCustomer = () => {

    return (
        <div className="modal fade" id="registerCustomerModal"  tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-register-customer-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-start" >Cadastrar Novo Cliente</h1>
                        <RegisterCustomerForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRegisterCustomer;