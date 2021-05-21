/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNFT = /* GraphQL */ `
  query GetNFT($id: ID!) {
    getNFT(id: $id) {
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
export const listNFTs = /* GraphQL */ `
  query ListNFTs(
    $filter: ModelNFTFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFTs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
