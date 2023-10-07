import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../dto/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";
import { IApolloCreateManager, IApolloGetAllVets, IEmployee, IManager, IVets } from "../../interfaces";

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

    async updateEmployee({ color, email, name, phone, specialty_id, id }: IVets): Promise<any> {
        const mutation = gql`mutation updateVet(
            $id: String!, $name: String!, $email: String!, $phone: String!, 
             $specialty_id: String!, $color: String!) {
            updateVet(vet: { 
                id: $id
                name: $name
                email: $email 
                phone: $phone
                specialty_id: $specialty_id
                color: $color
            }) {
                name
            }
          }`
        try {
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { color, email, name, phone, specialty_id, id },

            });

            ToastMessage(ToastEnum.success, "Funcionário atualizado com sucesso")

            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }
    async removeEmployee(id: string): Promise<any> {
        const mutation = gql`mutation removeVet($id: String!) {
            removeVet(id: $id) {
                name
            }
          }`
        try {
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { id },
            });

            ToastMessage(ToastEnum.success, "Funcionário removido com sucesso")

            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async getAllEmployees() {
        const query = gql`query getAllVets {
            getAllVets {
                name
                specialty_id
                id
                email
                phone
                color
            }
          }`
        try {
            const { data }: IApolloGetAllVets = await apolloClient.query({
                query
            });

            return data.getAllVets
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

}

const userService = new UserService();
export default userService;