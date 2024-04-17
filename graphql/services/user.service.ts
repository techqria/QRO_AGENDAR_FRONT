import { gql } from '@apollo/client';

export const GET_ALL_VETS = gql`query getAllVets {
    getAllVets {
        name
        specialty_id
        id
        email
        phone
        color
    }
  }`

export const UPDATE_VET = gql`mutation updateVet(
    $id: String!, $name: String!, $email: String!, $phone: String!, 
     $specialty_id: String!, $color: String!) {
    updateVet(vet: { 
        id: $id
        name: $name
        email: $email 
        phone: $phone
        specialty_id: $specialty_id
        color: $color
    }) {
        id
        name
    }
  }`

export const CREATE_MANAGER = gql`mutation createManager($name: String!, $email: String!, $phone: String!, $password: String!) {
    createManager(manager: { 
        name: $name, 
        email: $email, 
        phone: $phone,
        password: $password
    }) {
        name
    }
  }`

export const CREATE_VET = gql`mutation createVet(
    $name: String!, $email: String!, $phone: String!, 
    $password: String!, $specialty: String!, $color: String!, 
    $imageUrl: String!) {
    createVet(vet: { 
        name: $name
        email: $email 
        phone: $phone
        password: $password
        specialty_id: $specialty
        color: $color
        image_url: $imageUrl
    }) {
        name
    }
  }`

export const CREATE_CUSTOMER = gql`mutation createCustomer(
    $name: String!, $email: String!, $phone: String!, 
    $password: String!, $image_url: String!, $birthdate: DateTime!,$adress: AdressInput!, $animals: [AnimalInput!]!) {
    createCustomer(customer: { 
        name: $name
        email: $email 
        phone: $phone
        password: $password
        image_url: $image_url
        birthdate: $birthdate
        adress: $adress
        animals: $animals
    }) {
        name
        animals{
            name
            color
            neutered
        }
    }
  }`

export const REMOVE_VET = gql`mutation removeVet($id: String!) {
    removeVet(id: $id) {
        name
    }
    
}`
export const GET_CUSTOMERS = gql`
  query getAllCustomers{
    getAllCustomers{
        id
        name
        phone
        email
        birthdate
        animals{
            name
            typeAnimalId
            avatar
            gender
            breed
            neutered
        }
        adress{
            city
            neighborhood
        }
    }
  }
  `

export const GET_VET_BY_ID = gql`query getUserById($id:String!){
    getUserById(id: $id){
        name
        specialty_id
    }
  }
`

export const GET_USER_BY_ID = gql`query getUserById($id: String!){
    getUserById(id: $id){
        name
        role
        email
    }
}
`

export const CHANGE_PASSWORD = gql`query changePassword($email: String!, $newPassword: String!, $repeatNewPassword: String!){
    changePassword(email: $email, newPassword: $newPassword, repeatNewPassword: $repeatNewPassword){
        email
    }
}
`