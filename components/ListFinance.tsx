import { faker } from "@faker-js/faker"

const ListFinance = () => {

    const employees = new Array(5).fill({}).map(() => {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            appointments: faker.random.numeric(),
            price: faker.commerce.price()
        }
    })

    return (
        <div className="w-100 d-flex flex-column gap-3 mt-5">
            {
                employees.map(el => (
                    <div className="d-flex justify-content-between bg-white p-3">
                        <div className="d-flex flex-column">
                            <h5 className="text-black fw-bold">{el.firstName}</h5>
                            <span className="text-black">{el.lastName}</span>
                        </div>

                        <div className="d-flex flex-column">
                            <h5 className="text-black fw-bold">{el.appointments}</h5>
                            <span className="text-black">Consultas</span>
                        </div>

                        <div className="d-flex flex-column">
                            <h5 className="text-primary fw-bold">R${el.price}</h5>
                            <span className="text-black">Valor total</span>
                        </div>

                        <button data-bs-toggle="modal" data-bs-target="#listFinancesModal" className="d-flex align-items-center p-0 m-0 btn btn-transparent">
                            <img role="button" src="https://raw.githubusercontent.com/gist/Aenewsss/fbe5368d795b9aececfdef9fa3c1edc9/raw/ab991ac12aa87c5ad47f3a8a2998415561c6b74e/modal-expand-qro-agendar.svg" alt="" />
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default ListFinance;