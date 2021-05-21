/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNFT = /* GraphQL */ `
  mutation CreateNFT(
    $input: CreateNFTInput!
    $condition: ModelNFTConditionInput
  ) {
    createNFT(input: $input, condition: $condition) {
      id
      name
      description
      image
      creator
      soldfor
      askingprice
      createdAt
      updatedAt
    }
  }
`;
export const updateNFT = /* GraphQL */ `
  mutation UpdateNFT(
    $input: UpdateNFTInput!
    $condition: ModelNFTConditionInput
  ) {
    updateNFT(input: $input, condition: $condition) {
      id
      name
      description
      image
      creator
      soldfor
      askingprice
      createdAt
      updatedAt
    }
  }
`;
export const deleteNFT = /* GraphQL */ `
  mutation DeleteNFT(
    $input: DeleteNFTInput!
    $condition: ModelNFTConditionInput
  ) {
    deleteNFT(input: $input, condition: $condition) {
      id
      name
      description
      image
      creator
      soldfor
      askingprice
      createdAt
      updatedAt
    }
  }
`;
