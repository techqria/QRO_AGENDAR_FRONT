import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../enum/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";

class FinanceService {
    async getFinanceList(): Promise<any> {
        const query = GET_FINANCES
        try {
            const { data }: any = await apolloClient.query({
                query
            });

            return data.getFinanceList
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async getFinanceListByUser(id: string): Promise<any> {
        const query = GET_FINANCE_BY_USER
        try {
            const { data }: any = await apolloClient.query({
                query,
                variables: { id }
            });

            return data.getFinanceListByUser
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }
}

const financeService = new FinanceService();
export default financeService;

export const GET_FINANCES = gql`query getFinanceList {
    getFinanceList {
        employee_id
        employee_name
        qtt_schedules
        revenue_generated
    }
  }`

export const GET_FINANCE_BY_USER =gql`query getFinanceListByUser($id: String!) {
    getFinanceListByUser(id: $id) {
        date
        payment{
          price
          method
        }
        customer_name
    }
  }`