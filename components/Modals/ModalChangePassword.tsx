import { useState } from "react";
import { ToastMessage } from "../../hooks/ToastMessage";
import { ToastEnum } from "../../enum/toast.enum";
import { useLazyQuery } from "@apollo/client";
import { CHANGE_PASSWORD } from "../../graphql/services/user.service";
import { AuthHeader } from "../../hooks/AuthHeader";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";

const ModalChangePassword = ({ email }: any) => {


    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [changePasswordQuery] = useLazyQuery(CHANGE_PASSWORD, AuthHeader())

    async function changePassword(e: any) {
        e.preventDefault()
        changePasswordQuery({
            variables: {
                email,
                newPassword: password,
                repeatNewPassword: repeatPassword
            }
        })
            .then(e => {
                if (e.error) ToastMessage(ToastEnum.error, e.error.message)
                else {
                    document.getElementById('close-change-password-modal').click()
                    ToastMessage(ToastEnum.success, "Senha alterada com sucesso")
                }
            })


    }

    return (
        <div className="modal fade" id="changePasswordModal"  tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-orange" id="staticBackdropLabel">Atualizar senha</h1>
                        <button id="close-change-password-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={changePassword}>
                            <div className="mb-3">
                                <input value={password} required onChange={e => setPassword(e.target.value)} type="password" className="form-control border-orange border-2" placeholder="Nova senha *" />
                            </div>
                            <div className="mb-3">
                                <input value={repeatPassword} required onChange={e => setRepeatPassword(e.target.value)} type="password" className="form-control border-orange border-2" placeholder="Repetir nova senha *" />
                            </div>
                            <div className="d-flex justify-content-center mb-4">
                                <button type="submit" className="btn btn-orange ps-5 pe-5 rounded">Alterar senha</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalChangePassword;