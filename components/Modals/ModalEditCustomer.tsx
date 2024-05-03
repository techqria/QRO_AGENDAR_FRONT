
import EditCustomerForm from "../Forms/EditCustomerForm";

const ModalEditCustomer = () => {

    return (
        <div className="modal fade" id="editCustomerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-edit-customer-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center" >Atualizar Dados do Cliente</h1>
                        <EditCustomerForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditCustomer;