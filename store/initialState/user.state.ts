import { RoleEnum } from "../../dto/role.enum";
import { IUser } from "../types/types";

export const UserInitialState: IUser = {
    role: RoleEnum.client,
    userId: ""
}