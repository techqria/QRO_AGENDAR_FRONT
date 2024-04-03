import { gql } from '@apollo/client';

export const GET_ALL_SCHEDULES = gql`query getSchedules {
    getSchedules {
        date
        payment{
          price
          method
        }
    }
  }`

export const GET_SCHEDULES_CALENDAR = gql`query getSchedulesCalendar {
    getSchedulesCalendar {
        specialty_name
        employee_name
        date
        employee_color
    }
  }`

export const REMOVE_SCHEDULE = gql`mutation removeSchedule($id: String!) {
    removeSchedule(id: $id) {
        title
    }
  }`

export const CREATE_SCHEDULE = gql`mutation createSchedule (
    $specialty_id: String!,$employee_id: String!,$date: DateTime!,
    $customer_name: String!,$customer_phone: String!,
    $method: String!,$price: Float!,$pet_breed: String!,
    $pet_name: String!,$pet_type: String!, $text: String!){
    createSchedule(schedule: {
        specialty_id: $specialty_id
        employee_id: $employee_id
        date: $date
        customer_name: $customer_name
        customer_phone: $customer_phone
        pet_breed: $pet_breed
        pet_name: $pet_name
        pet_type: $pet_type
        text: $text
        payment: {
            price: $price
            method: $method
        }
    })
    {
        pet_name
    }
}`