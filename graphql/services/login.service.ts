import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ErrorGQL } from "../../hooks/Error";
import { ToastEnum } from "../../dto/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";

class LoginService {
    async login(email: string, password: string) {

        const query = gql`query login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          name
          role
        }
        token
      }
    }`

        try {
            const { data, loading } = await apolloClient.query({
                query,
                variables: { email, password },
            });

            console.log(data, loading)

            return data
        } catch (error) {
            return ToastMessage(ToastEnum.error, error.message)
        }
    }
}

const loginService = new LoginService();
export default loginService;