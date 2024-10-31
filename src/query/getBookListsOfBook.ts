import { gql } from "@apollo/client";

/**
"variables": {
    "id": "kca://book/amzn1.gr.book.v1.iUoduJh08Drcwhc9Kt94qg",
    "limit": 4 // max 10
}
*/
export const getBookListsOfBook = gql`
  query getBookListsOfBook($id: ID!, $limit: Int!) {
    getBookListsOfBook(id: $id, paginationInput: { limit: $limit }) {
      ...BookListFragment
      __typename
    }
  }

  fragment BookListFragment on BookListsConnection {
    edges {
      node {
        id: legacyId
        title
        userListVotesCount
        listBooksCount
        books(paginationInput: { limit: 3 }) {
          edges {
            node {
              imageUrl
              title
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
`;
