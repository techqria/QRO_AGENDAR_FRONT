import { ToastEnum } from "../dto/toast.enum";
import { changeMessage, changeType, changeVisible } from "../store/slices/toast.slice";
import { store } from "../store";

export const ToastMessage = (type: ToastEnum, message: string) => {
    store.dispatch(changeVisible(true))
    store.dispatch(changeType(type))
    store.dispatch(changeMessage(message))
    setTimeout(() => store.dispatch(changeVisible(false)), 4000)
}
