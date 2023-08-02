import { ToastEnum } from "../../dto/toast.enum";
import { IToast } from "../types/types";

export const ToastInitialState: IToast = {
    visible: false,
    message: "",
    type: ToastEnum.success
}