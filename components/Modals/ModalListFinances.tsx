import { faker } from "@faker-js/faker";

const ModalListFinances = () => {

    const employee = new Array(3).fill({}).map(() => {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            date: faker.date.recent(20).getDate().toString().padStart(2, '0') + "/" + faker.date.recent(20).getMonth().toString().padStart(2, '0'),
            hour: faker.datatype.datetime().getHours().toString().padStart(2, '0') + ":" + faker.datatype.datetime().getMinutes().toString().padStart(2, '0'),
            paymentMethod: ['Pix', 'Crédito', 'Débito', 'Dinheiro'][Math.round(Math.random() + 2)],
            price: faker.commerce.price()
        }
    })

    return (
        <div className="modal fade" id="listFinancesModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '90%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            employee.map(el => (
                                <div className="d-flex justify-content-between bg-white p-3">
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-black fw-bold mb-0">{el.firstName}</h5>
                                        <span className="text-black fw-light">{el.lastName}</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-black fw-bold mb-0">{el.date}</h5>
                                        <span className="text-black fw-light">Data</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-black fw-bold mb-0">{el.hour}</h5>
                                        <span className="text-black fw-light">Horário</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-primary fw-bold mb-0">{el.paymentMethod}</h5>
                                        <span className="text-black fw-light">Forma de pagamento</span>
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-primary fw-bold mb-0">R${el.price}</h5>
                                        <span className="text-black fw-light">Valor da Consulta</span>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <h5 className="text-primary fw-bold mb-0">{el.paymentMethod}</h5>
                                        <span className="text-black fw-light">Forma de pagamento</span>
                                    </div>


                                    <button className="d-flex align-items-center p-0 m-0 btn btn-transparent">
                                        <img role="button" src="https://raw.githubusercontent.com/gist/Aenewsss/f05e99713590aa05bcf312921ff07808/raw/c2501a00156f9fcc9da7bbf6e3e4946ed6f0e9ce/check-list-icon.svg" alt="" />
                                        <img role="button" src="https://raw.githubusercontent.com/gist/Aenewsss/0ab6e5683c4e5b3cb99534e089be002c/raw/36b0ea89bab16f143cee05f1842e4ff5d0345333/cancel-list-icon.svg" alt="" />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalListFinances;