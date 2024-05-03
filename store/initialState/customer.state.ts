import { ICustomer } from "../types/types";

export const CustomerInitialState: ICustomer = {
    customerId: "",
    currentPet: {
        index:0,
        avatar:"",
        breed:"",
        color:"",
        gender:"",
        name:"",
        neutered:false,
        userId:"",
        typeAnimalId:"",
    }
}