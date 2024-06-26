import { gql } from '@apollo/client';
import { apolloClient, useApollo } from "../graphql-client";
import { IVerifyToken } from "../../interfaces";

class AuthService {
  async verifyToken(token: string): Promise<IVerifyToken> {
    try {
      const { data, loading }: any = await apolloClient.query({ query: VERIFY_TOKEN_QUERY, variables: { token } })

      return data.verifyToken
    } catch (error) {
      
    }
  }
}

const authService = new AuthService();
export default authService;

export const LOGIN_QUERY = gql`query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      role
      id
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