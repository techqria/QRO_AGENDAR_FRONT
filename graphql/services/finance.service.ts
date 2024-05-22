import { gql } from '@apollo/client';

export const GET_FINANCES = gql`query getFinanceList($startDate: DateTime!, $finalDate: DateTime!) {
    getFinanceList(
      startDate: $startDate
      finalDate: $finalDate
  ) {
        employee_id
        employee_name
        qtt_schedules
        revenue_generated
    }
  }`

export const GET_FINANCE_BY_USER =gql`query getFinanceListByUser($id: String!,$startDate: DateTime!, $finalDate: DateTime!) {
    getFinanceListByUser(
      id: $id
      startDate: $startDate
      finalDate: $finalDate
    ) {
        date
        payment{
          price
          method
        }
        customer_name
        pet_name
        pet_type
        pet_breed
    }
  }`