import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../dto/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";
import { IApolloCreateManager, IEmployee, IManager } from "../../interfaces";

class UserService {
    async createManager({ name, email, phone, password }: IManager): Promise<any> {
        const mutation = gql`mutation createManager($name: String!, $email: String!, $phone: String!, $password: String!) {
            createManager(manager: { 
                name: $name, 
                email: $email, 
                phone: $phone,
                password: $password
            }) {
                name
            }
          }`
        try {
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { name, email, phone, password },

            });

            ToastMessage(ToastEnum.success, "Gerente criado com sucesso")

            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async createEmployee({ name, email, phone, password, specialty, color = "#000000", imageUrl = "" }: IEmployee): Promise<any> {
        const mutation = gql`mutation createVet(
            $name: String!, $email: String!, $phone: String!, 
            $password: String!, $specialty: String!, $color: String!, 
            $imageUrl: String!) {
            createVet(vet: { 
                name: $name
                email: $email 
                phone: $phone
                password: $password
                specialty_id: $specialty
                color: $color
                image_url: $imageUrl
            }) {
                name
            }
          }`
        try {
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { name, email, phone, password, specialty, color, imageUrl },

            });

            ToastMessage(ToastEnum.success, "Funcionário criado com sucesso")

            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

}

const userService = new UserService();
export default userService;