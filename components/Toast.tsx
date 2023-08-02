import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/types/types";

const Toast = () => {

    const { visible, message } = useSelector((store: IStore) => store.toast)

    useEffect(() => {
        console.log("hello")
    }, []);

    return (
        visible &&
        <div className="position-absolute end-0 p-5 ">
            <p className="bg-secondary p-3">{message}</p>
        </div>

    );
}

export default Toast;