import { gql } from "@apollo/client"

export const CREATE_ANIMAL = gql`
    mutation createAnimal(
      $name:String!,$userId:String!,  $gender: String!,
      $breed: String!, $color: String!,$typeAnimalId: String!,
      $neutered: Boolean!, $avatar: String,
    ) {
      createAnimal(animal: {
            userId: $userId
            name: $name
            gender: $gender
            breed: $breed
            color: $color
            typeAnimalId: $typeAnimalId
            neutered: $neutered
            avatar: $avatar
          }
      )
        {
          name
        }
    }
`

export const UPDATE_ANIMAL = gql`mutation updateAnimalByIndex($index: Float!, $animal: AnimalInput!) {
  updateAnimalByIndex(
    index: $index,
    animal: $animal
  )
  {
    name
  }
}
`

export const REMOVE_ANIMAL = gql`mutation removeAnimalByIndex($index: Float!, $userId: String!) {
  removeAnimalByIndex(
    index: $index,
    userId: $userId
  )
  {
    name
  }
}
`