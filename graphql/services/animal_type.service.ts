import { gql } from "@apollo/client"

export const CREATE_ANIMAL_TYPE = gql`
    mutation createAnimalType($name:String!) {
        createAnimalType(animalType: {
            name: $name,
          })
        {
          name
        }
    }
`
export const GET_ANIMAL_TYPES = gql`query getAllAnimalTypes {
        getAllAnimalTypes
        {
          name
          id
        }
    }
`

export const GET_ANIMAL_TYPE_BY_ID = gql`query getAnimalTypeById($id: String!){
  getAnimalTypeById(id: $id) {
    name
  }
}
`