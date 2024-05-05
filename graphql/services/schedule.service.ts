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
        id
    }
  }`

export const GET_SCHEDULE_BY_ID = gql`query getScheduleById($id: String!) {
    getScheduleById(id: $id) {
        pet_name
        customer_name
        customer_phone
        employee_id
        specialty_id
        date
        pet_breed
        payment{
          method
          price
        }
        pet_type
        text
    }
  }`

export const GET_SCHEDULE_DETAIL_BY_ID = gql`query getScheduleDetailsById($id: String!) {
    getScheduleDetailsById(id: $id) {
      customer_name
      customer_phone
      employee
      specialty
      date
      pet_name
      pet_breed
      pet_type
      pet_neutered
      payment{
        method
        price
      }
      text
    }
  }`


export const REMOVE_SCHEDULE = gql`mutation removeSchedule($id: String!) {
    removeSchedule(id: $id) {
        id
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

export const UPDATE_SCHEDULE = gql`mutation updateSchedule (
    $id: String!, $specialty_id: String!,$employee_id: String!,$date: DateTime!,
    $customer_name: String!,$customer_phone: String!,
    $method: String!,$price: Float!,$pet_breed: String!,
    $pet_name: String!,$pet_type: String!, $text: String!){
    updateSchedule(
      id: $id, 
      schedule: {
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