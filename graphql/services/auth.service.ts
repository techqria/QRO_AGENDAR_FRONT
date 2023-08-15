import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../dto/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";
import { IApolloLogin, IApolloVerifyToken, ILogin, IVerifyToken } from "../../interfaces";

class AuthService {
  async login(email: string, password: string): Promise<ILogin> {

    const query = gql`query login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          role
        }
        token,
        success
      }
    }`

    try {
      const { data }: IApolloLogin = await apolloClient.query({
        query,
        variables: { email, password },
      });

      window.localStorage.setItem("token", data.login.token)

      return data.login
    } catch (error) {
      ToastMessage(ToastEnum.error, error.message)
      return error
    }
  }

  async verifyToken(token: string): Promise<IVerifyToken> {
    const query = gql`query verifyToken($token: String!) {
      verifyToken(token: $token) {
       userId
       userRole
      }
    }`
    try {
      const { data }: IApolloVerifyToken = await apolloClient.query({
        query,
        variables: { token },
      });

      return data.verifyToken
    } catch (error) {
      return error
    }
  }
}

const authService = new AuthService();
export default authService;