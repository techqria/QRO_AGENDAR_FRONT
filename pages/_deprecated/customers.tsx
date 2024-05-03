import CustomersList from "../../components/CustomersList";
import ModalEditCustomer from "../../components/Modals/ModalEditCustomer";
import ModalEditPet from "../../components/Modals/ModalEditPet";
import ModalRegisterCustomer from "../../components/Modals/ModalRegisterCustomer";

const Customers = () => {
    return (
        <section className='container bg-white-sec h-100 d-flex flex-column justify-content-center align-items-center pt-md-0 pt-4'>
            <h2 className="w-100 text-start text-black mt-5 pt-5">Clientes</h2>
            <CustomersList />
            <button data-bs-toggle="modal" data-bs-target="#registerCustomerModal" className="btn btn-orange mt-5 rounded fw-bold">Cadastrar Novo Cliente</button>
            <ModalRegisterCustomer />
            <ModalEditCustomer />
            <ModalEditPet />
        </section>
    );
}

export default Customers;