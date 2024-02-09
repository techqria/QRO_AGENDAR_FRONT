import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../dto/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";
import { IApolloGetAllSpecialties } from "../../interfaces";

class SpecialtyService {
    async getAllSpecialties(): Promise<any> {
        const query = gql`query getAllSpecialties {
            getAllSpecialties {
                title
                id
            }
          }`
        try {
            const { data }: IApolloGetAllSpecialties = await apolloClient.query({
                query
            });

            return data.getAllSpecialties
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async createSpecialty(title: string): Promise<any> {
        const mutation = gql`mutation createSpecialty ($title: String!){
            createSpecialty(specialty: {
                title: $title
            })
            {
                title
                id
            }
        }`
        try {
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { title },

            });

            ToastMessage(ToastEnum.success, "Especialidade criada com sucesso")

            console.log(data)
            return data.createSpecialty
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async removeSpecialty(id: string): Promise<any> {
        const mutation = gql`mutation removeSpecialty($id: String!) {
            removeSpecialty(id: $id) {
                title
            }
          }`
        try {
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { id },
            });

            ToastMessage(ToastEnum.success, "Especialidade removida com sucesso")

            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }
}

const specialtyService = new SpecialtyService();
export default specialtyService;