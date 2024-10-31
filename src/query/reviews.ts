import { gql } from "@apollo/client";

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
export const getReviewsQuery = gql`
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
