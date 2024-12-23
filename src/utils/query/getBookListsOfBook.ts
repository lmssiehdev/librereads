import { z } from "zod";

/**
"variables": {
    "id": "kca://book/amzn1.gr.book.v1.iUoduJh08Drcwhc9Kt94qg",
    "limit": 4 // max 10
}
*/
export const getBookListsOfBook = `
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

export type GetBookListsOfBook = z.infer<typeof getBookListsOfBookSchema>;

const getBookListsOfBookSchema = z.object({
  getBookListsOfBook: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          id: z.number(),
          title: z.string(),
          userListVotesCount: z.number(),
          listBooksCount: z.number(),
          books: z.object({
            edges: z.array(
              z.object({
                node: z.object({
                  imageUrl: z.string(),
                  title: z.string(),
                  __typename: z.string(),
                }),
                __typename: z.string(),
              })
            ),
            __typename: z.string(),
          }),
          __typename: z.string(),
        }),
        __typename: z.string(),
      })
    ),
    __typename: z.string(),
  }),
});
