import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../dto/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";
import { IApolloCreateManager, IManager } from "../../interfaces";

class UserService {
    async createManager({ name, email, phone, password}: IManager): Promise<any> {
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

            console.log(data)

            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

}

const userService = new UserService();
export default userService;