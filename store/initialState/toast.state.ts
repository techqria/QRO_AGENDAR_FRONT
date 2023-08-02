import { ToastEnum } from "../../dto/toast.enum";
import { IToast } from "../types/types";

export const ToastInitialState: IToast = {
    visible: false,
    message: "asda asdsad asd as",
    type: ToastEnum.success
}