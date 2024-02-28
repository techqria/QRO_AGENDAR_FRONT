import { gql } from '@apollo/client';

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