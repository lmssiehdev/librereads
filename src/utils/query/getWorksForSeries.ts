import { z } from "zod";

/**
 "variables": {
    "getWorksForSeriesInput": {
        "id": "kca://series/amzn1.gr.series.v1.MYoVK6aqozGu9bYzVw1a7w",
        "isPrimary": true
    },
    "pagination": {
        "limit": 20
    }
}
 */
export const getWorksForSeries = `
  query getWorksForSeries(
    $getWorksForSeriesInput: GetWorksForSeriesInput!
    $pagination: PaginationInput
  ) {
    getWorksForSeries(
      getWorksForSeriesInput: $getWorksForSeriesInput
      pagination: $pagination
    ) {
      edges {
        seriesPlacement
        isPrimary
        node {
          stats {
            averageRating
            ratingsCount
            __typename
          }
          bestBook {
            id
            legacyId
            title
            imageUrl
            webUrl
            primaryContributorEdge {
              node {
                id
                legacyId
                name
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
  }
`;

export type GetWorkForSeries = z.infer<typeof getWorkForSeriesSchema>;

const getWorkForSeriesSchema = z.object({
	getWorksForSeries: z.object({
		__typename: z.string(),
		edges: z.array(
			z.object({
				__typename: z.string(),
				seriesPlacement: z.string(),
				isPrimary: z.boolean(),
				node: z.object({
					__typename: z.string(),
					id: z.string(),
					stats: z.object({
						__typename: z.string(),
						averageRating: z.number(),
						ratingsCount: z.number(),
					}),
					bestBook: z.object({
						__typename: z.string(),
						id: z.string(),
						legacyId: z.number(),
						title: z.string(),
						imageUrl: z.string(),
						webUrl: z.string(),
						primaryContributorEdge: z.object({
							__typename: z.string(),
							node: z.object({
								__typename: z.string(),
								id: z.string(),
								legacyId: z.string(),
								name: z.string(),
							}),
						}),
					}),
				}),
			}),
		),
	}),
});
