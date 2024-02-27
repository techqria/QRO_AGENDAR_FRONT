const ModalChangePassword = () => {
    return (
        <div className="modal fade" id="changePasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-orange" id="staticBackdropLabel">Atualizar senha</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <input type="password" className="form-control border-orange border-2" placeholder="Nova senha *" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control border-orange border-2" placeholder="Repetir nova senha *" />
                            <p className="text-danger">Campos obrigatórios não preenchidos</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                        <button type="button" className="btn btn-orange ps-5 pe-5 rounded">Alterar senha</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalChangePassword;