const ModalEditEmployee = () => {

    async function editEmployee(e) {
        e.preventDefault()

    }
    async function deleteEmployee(e) {
        e.preventDefault()

    }

    return (
        <div className="modal fade" id="editEmployeeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center" >Atualizar Funcionário</h1>

                        <form onSubmit={editEmployee} className="mt-3">
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Nome</label>
                                <input required placeholder="Davi Speck" className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Especialidade</label>
                                <input required placeholder="Cardiologista" className="border-orange form-control mw-400" type="text" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Cor</label>
                                <input required className="border-orange form-control mw-400" type="color" />
                            </div>
                            <div className="mb-3 d-flex justify-content-evenly">
                                <label className="w-20 text-black">Imagem</label>
                                <input required className="border-orange form-control mw-400" type="file" />
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-orange mt-5 rounded-pill fw-bold"> Atualizar Funcionário</button>
                            </div>
                        </form>

                        <div className="d-flex justify-content-center">
                            <button onClick={deleteEmployee} className="btn btn-orange rounded-pill fw-bold">Remover Funcionário</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditEmployee;