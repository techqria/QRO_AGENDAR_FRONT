import { useSelector } from "react-redux";
import specialtyService, { REMOVE_SPECIALTY } from "../../graphql/services/specialty.service";
import { IStore } from "../../store/types/types";
import { useMutation } from "@apollo/client";

const ModalEditSpecialty = () => {

    const { id: specialtyId } = useSelector((store: IStore) => store.specialty)

    const [removeSpecialtyMutation] = useMutation(REMOVE_SPECIALTY)
    async function deleteSpecialty(e) {
        e.preventDefault()

        await removeSpecialtyMutation({ variables: { id: specialtyId } })
        document.getElementById("close-edit-specialty-modal").click();
    }

    return (
        <div className="modal fade" id="editSpecialtyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            {/* @ts-ignore */}
            <div className="modal-dialog modal-dialog-centered" style={{ '--bs-modal-width': '60%' }} >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button id="close-edit-specialty-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-orange text-center">Atualizar Especialidade</h1>

                        <div className="d-flex justify-content-center mt-5 mb-5">
                            <button onClick={deleteSpecialty} className="btn btn-danger rounded fw-bold">Remover Especialidade</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditSpecialty;