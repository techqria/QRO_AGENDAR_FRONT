import { gql } from '@apollo/client';

export const GET_DASHBOARD_TIME = gql`query getDashboard {
  getDashboard{
      weekScheduleHours{
          first{
            hour
            qtt_schedules
          }
          second {
            hour
            qtt_schedules
          }
          third{
            hour
            qtt_schedules
          }
          fourth{
            hour
            qtt_schedules
          }
          fifth{
            hour
            qtt_schedules
          }
         
        }
  }
}`

export const GET_DASH_PAYMENT_METHOD =gql`query getDashboard {
  getDashboard{
      paymentMethodsPercentage{
          pix
          debit
          money
          credit
        }
  }
}`

export const GET_DASH_FINANCE = gql`query getDashboardFinance($startDate: DateTime!, $finalDate: DateTime!) {
  getDashboardFinance(
    startDate: $startDate
    finalDate: $finalDate
  ){
    paymentMethods{
      pix
      debit
      money
      credit
    }
  }
}`