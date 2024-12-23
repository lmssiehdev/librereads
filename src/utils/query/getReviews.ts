import { z } from "zod";

/**
 "variables": {
    "filters": {
      "resourceType": "WORK",
      "resourceId": "kca://work/amzn1.gr.work.v1.H-uiZxbMDAHsxOpFwGVKGQ"
    },
    "pagination": {
      "limit": 30
    }
  }
 */
export const getReviewsQuery = `
  query getReviews(
    $filters: BookReviewsFilterInput!
    $pagination: PaginationInput
  ) {
    getReviews(filters: $filters, pagination: $pagination) {
      ...BookReviewsFragment
      __typename
    }
  }

  fragment BookReviewsFragment on BookReviewsConnection {
    totalCount
    edges {
      node {
        ...ReviewCardFragment
        __typename
      }
      __typename
    }
    pageInfo {
      prevPageToken
      nextPageToken
      __typename
    }
    __typename
  }

  fragment ReviewCardFragment on Review {
    __typename
    id
    creator {
      ...ReviewerProfileFragment
      __typename
    }
    recommendFor
    updatedAt
    createdAt
    spoilerStatus
    lastRevisionAt
    text
    rating
  }

  fragment ReviewerProfileFragment on User {
    id: legacyId
    imageUrlSquare
    isAuthor
    textReviewsCount
    name
    webUrl
    contributor {
      id
      works {
        totalCount
        __typename
      }
      __typename
    }
    __typename
  }
`;

export type GetReviews = z.infer<typeof getReviewsSchema>;

const getReviewsSchema = z.object({
  getReviews: z.object({
    totalCount: z.number(),
    edges: z.array(
      z.object({
        node: z.object({
          __typename: z.string(),
          id: z.string(),
          creator: z.object({
            id: z.number(),
            imageUrlSquare: z.string(),
            isAuthor: z.boolean(),
            textReviewsCount: z.number(),
            name: z.string(),
            webUrl: z.string(),
            contributor: z.null(),
            __typename: z.string(),
          }),
          recommendFor: z.null(),
          updatedAt: z.number(),
          createdAt: z.number(),
          spoilerStatus: z.boolean(),
          lastRevisionAt: z.number(),
          text: z.string(),
          rating: z.number(),
        }),
        __typename: z.string(),
      })
    ),
    pageInfo: z.object({
      prevPageToken: z.string(),
      nextPageToken: z.string(),
      __typename: z.string(),
    }),
    __typename: z.string(),
  }),
});
