import { z } from "zod";

/**
  "variables": {
    "getWorksByContributorInput": {
      "id": "kca://author/amzn1.gr.author.v1.OK_X6rOc-ss75X962O9SPw"
    },
    "pagination": {
      "limit": 20 // limit
    }
  }
 */
export const getWorksByContributor = `
  query getWorksByContributor(
    $getWorksByContributorInput: GetWorksByContributorInput!
    $pagination: PaginationInput
  ) {
    getWorksByContributor(
      getWorksByContributorInput: $getWorksByContributorInput
      pagination: $pagination
    ) {
      edges {
        node {
          id
          stats {
            averageRating
            ratingsCount
            __typename # BookOrWorkStats
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
                isGrAuthor
                __typename #Contributor
              }
              __typename # BookContributorEdge
            }
            __typename # Book
          }
          __typename # Work
        }
        __typename # ContributorWorksEdge
      }
      __typename
    }
  }
`;

export type GetWorksByContributor = z.infer<typeof getWorksByContributorSchema>;
export const getWorksByContributorSchema = z.object({
	getWorksByContributor: z.object({
		__typename: z.string(),
		edges: z.array(
			z.object({
				__typename: z.string(),
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
								isGrAuthor: z.boolean(),
							}),
						}),
					}),
				}),
			}),
		),
	}),
});
