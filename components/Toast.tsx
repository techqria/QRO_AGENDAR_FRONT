import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/types/types";
import { ToastEnum } from "../enum/toast.enum";

const Toast = () => {

    const { visible, message, type } = useSelector((store: IStore) => store.toast)

    function checkBackground() {
        switch (type) {
            case ToastEnum.error: return "bg-danger"
            case ToastEnum.info: return "bg-info"
            case ToastEnum.success: return "bg-success"
            case ToastEnum.warning: return "bg-warning"
        }
    }

    const top = typeof document !== "undefined" ? document.body.getBoundingClientRect().y : 0

    return (
        visible &&
        <div style={{marginTop: -top + 20}} className={`toast-card d-flex position-absolute end-0 ms-5 me-5 mb-5 ${checkBackground()}`}>
            <p className="ms-4 align-self-center mb-0">{message}</p>
        </div>
    );
}

export default Toast;