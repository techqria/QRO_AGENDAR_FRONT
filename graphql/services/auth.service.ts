import { gql } from '@apollo/client';
import { useApollo } from "../graphql-client";
import { ToastEnum } from "../../enum/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";
import { IApolloLogin, IApolloVerifyToken, ILogin, IVerifyToken } from "../../interfaces";
import { store } from "../../store";
import { changeRole, changeUserId } from "../../store/slices/user.slice";

class AuthService {
  async login(email: string, password: string): Promise<ILogin> {

    const query = LOGIN_QUERY

    try {
      const { data }: IApolloLogin = await apolloClient.query({
        query,
        variables: { email, password },
      });

      window.localStorage.setItem("token", data.login.token)

      const result = this.verifyToken(data.login.token)
      store.dispatch(changeRole((await result).userRole))
      store.dispatch(changeUserId((await result).userId))

      return data.login
    } catch (error) {
      ToastMessage(ToastEnum.error, error.message)
      return error
    }
  }

  async verifyToken(token: string): Promise<IVerifyToken> {
    const query = VERIFY_TOKEN_QUERY
    
    try {
      const { data }: IApolloVerifyToken = await client.query({
        query,
        variables: { token },
      });

      return data.verifyToken
    } catch (error) {
      return error
    }
  }

  async getCurrentUser(userId: string): Promise<any> {
    const query = gql`query getUserById($userId: String!) {
      getUserById(id: $userId) {
       name
      }
    }`
    try {
      const { data } = await apolloClient.query({
        query,
        variables: { userId },
      });

      return data.getUserById
    } catch (error) {
      return error
    }
  }
}

const authService = new AuthService();
export default authService;

export const LOGIN_QUERY = gql`query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      role
    }
    token,
    success
  }
}`

export const VERIFY_TOKEN_QUERY = gql`query verifyToken($token: String!) {
  verifyToken(token: $token) {
   userId
   userRole
  }
}`