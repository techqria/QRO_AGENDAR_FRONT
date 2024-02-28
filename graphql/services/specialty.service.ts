import { gql } from '@apollo/client';

export const GET_ALL_SPECIALTIES = gql`query getAllSpecialties {
    getAllSpecialties {
        title
        id
    }
  }`

export const CREATE_SPECIALTY = gql`mutation createSpecialty ($title: String!){
    createSpecialty(specialty: {
        title: $title
    })
    {
        title
        id
    }
}`

export const REMOVE_SPECIALTY = gql`mutation removeSpecialty($id: String!) {
    removeSpecialty(id: $id) {
        title
    }
  }`