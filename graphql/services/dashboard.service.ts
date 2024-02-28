import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../enum/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";

class DashboardService {
    async getDashboardFinanceChart(): Promise<any> {
        const query = GET_DASH_FINANCE
        try {
            const { data }: any = await apolloClient.query({
                query
            });

            return data.getDashboard.annualRevenue
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }
    async getDashboardPaymentMethodChart(): Promise<any> {
        const query = GET_DASH_PAYMENT_METHOD
        try {
            const { data }: any = await apolloClient.query({
                query
            });

            return data.getDashboard.paymentMethodsPercentage
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async getDashboardTimeChart(): Promise<any> {
        const query = GET_DASHBOARD_TIME
        try {
            const { data }: any = await apolloClient.query({
                query
            });

            return data.getDashboard.weekScheduleHours
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }
}

const dashboardService = new DashboardService();
export default dashboardService;

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

export const GET_DASH_FINANCE = gql`query getDashboard {
  getDashboard{
      annualRevenue{
      january
      february
      march
      april
      may
      june
      july
      august
      september
      october
      november
      december
      }
    }
}`