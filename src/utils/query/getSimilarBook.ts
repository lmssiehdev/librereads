import { z } from "zod";

/**
 "variables": {
    "limit": 20, // max 20?
    "id": "kca://book/amzn1.gr.book.v1.iUoduJh08Drcwhc9Kt94qg"
  }
 */
export const getSimilarBooks = `
  query getSimilarBooks($id: ID!, $limit: Int!) {
    getSimilarBooks(id: $id, pagination: { limit: $limit }) {
      webUrl
      edges {
        node {
          legacyId
          title
          imageUrl
          webUrl
          description
          primaryContributorEdge {
            node {
              name
              legacyId
              __typename
            }
            __typename
          }
          work {
            stats {
              averageRating
              ratingsCount
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
  }
`;

export const getSimilarBooksSchema = z.object({
	getSimilarBooks: z.object({
		__typename: z.string(),
		webUrl: z.string(),
		edges: z.array(
			z.object({
				__typename: z.string(),
				node: z.object({
					__typename: z.string(),
					legacyId: z.number(),
					title: z.string(),
					imageUrl: z.string(),
					webUrl: z.string(),
					description: z.string(),
					primaryContributorEdge: z.object({
						__typename: z.string(),
						node: z.object({
							__typename: z.string(),
							name: z.string(),
							legacyId: z.string(),
						}),
					}),
					work: z.object({
						__typename: z.string(),
						stats: z.object({
							__typename: z.string(),
							averageRating: z.number(),
							ratingsCount: z.number(),
						}),
					}),
				}),
			}),
		),
	}),
});

export type GetSimilarBooksSchema = z.infer<typeof getSimilarBooksSchema>;
