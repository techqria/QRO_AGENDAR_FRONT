import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/types/types";
import { ToastEnum } from "../dto/toast.enum";

const Toast = () => {

    const { visible, message, type } = useSelector((store: IStore) => store.toast)

    function checkBackground(){
        switch(type){
            case ToastEnum.error: return "bg-danger"
            case ToastEnum.info: return "bg-info"
            case ToastEnum.success: return "bg-success"
            case ToastEnum.warning: return "bg-warning"
        }
    }

    return (
        visible &&
        <div className={`toast-card d-flex position-absolute end-0 m-5 ${checkBackground()}`}>
            <p className="ms-4 align-self-center mb-0">{message}</p>
        </div>
    );
}

export default Toast;