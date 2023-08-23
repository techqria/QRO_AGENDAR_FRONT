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
}

const specialtyService = new SpecialtyService();
export default specialtyService;