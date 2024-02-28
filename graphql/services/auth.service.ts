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

    return null
  }

  async verifyToken(token: string): Promise<IVerifyToken> {
    const query = VERIFY_TOKEN_QUERY
    return null
  }

  async getCurrentUser(userId: string): Promise<any> {
    const query = gql`query getUserById($userId: String!) {
      getUserById(id: $userId) {
       name
      }
    }`
    return null
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