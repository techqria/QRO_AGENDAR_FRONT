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

export const UPDATE_ANIMAL = gql`mutation updateAnimal($userId: String!, $index: Int!, $animal: AnimalInput!) {
  updateAnimal(
    userId: $userId,
    index: $index,
    animal: $animal
  )
  {
    name
  }
}
`