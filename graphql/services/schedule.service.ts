import { gql } from '@apollo/client';
import { apolloClient } from "../graphql-client";
import { ToastEnum } from "../../dto/toast.enum";
import { ToastMessage } from "../../hooks/ToastMessage";
import { IApolloGetAllSpecialties, IScheduleRegister } from "../../interfaces";

class ScheduleService {
    async getAllSchedules(): Promise<any> {
        const query = gql`query getSchedules {
            getSchedules {
                date
                payment{
                  price
                  method
                }
            }
          }`
        try {
            const { data }: any = await apolloClient.query({
                query
            });

            return data.getSchedules
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }
    async getSchedulesCalendar(): Promise<any> {
        const query = gql`query getSchedulesCalendar {
            getSchedulesCalendar {
                specialty_name
                employee_name
                date
                employee_color
            }
          }`
        try {
            const { data }: any = await apolloClient.query({
                query
            });
            return data.getSchedulesCalendar
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async createSchedule({ specialty_id, employee_id, date, customer_name, customer_phone, payment, pet_breed, pet_name, pet_type }: IScheduleRegister): Promise<any> {
        const mutation = gql`mutation createSchedule (
            $specialty_id: String!,$employee_id: String!,$date: DateTime!,
            $customer_name: String!,$customer_phone: String!,
            $method: String!,$price: Float!,$pet_breed: String!,
            $pet_name: String!,$pet_type: String!){
            createSchedule(schedule: {
                specialty_id: $specialty_id
                employee_id: $employee_id
                date: $date
                customer_name: $customer_name
                customer_phone: $customer_phone
                pet_breed: $pet_breed
                pet_name: $pet_name
                pet_type: $pet_type
                payment: {
                    price: $price
                    method: $method
                }
            })
            {
                pet_name
            }
        }`
        try {

            const { method, price } = payment
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { specialty_id, employee_id, date, customer_name, customer_phone, method, price, pet_breed, pet_name, pet_type },

            });

            ToastMessage(ToastEnum.success, "Agendamento criado com sucesso")

            console.log(data)
            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }

    async removeSchedule(id: string): Promise<any> {
        const mutation = gql`mutation removeSchedule($id: String!) {
            removeSchedule(id: $id) {
                title
            }
          }`
        try {
            const { data }: any = await apolloClient.mutate({
                mutation,
                variables: { id },
            });

            ToastMessage(ToastEnum.success, "Especialidade removida com sucesso")

            return data
        } catch (error) {
            ToastMessage(ToastEnum.error, error.message)
            return error
        }
    }
}

const scheduleService = new ScheduleService();
export default scheduleService;