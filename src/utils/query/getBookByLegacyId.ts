import { z } from "zod";

/**
 "variables": {
  "legacyBookId": 186074
 }
 */
export const getBookByLegacyId = `
  fragment DetailedContributorFragment on BookContributorEdge {
    node {
      id
      legacyId
      name
      description
      isGrAuthor
      works {
        totalCount
      }
      profileImageUrl
      webUrl

      user {
        id: legacyId
        followersCount
        # reviewsCount
        # ratingsCount
        # webUrl
        # name
      }
    }
    role
  }
  fragment BasicContributorFragment on BookContributorEdge {
    node {
      id
      name
      webUrl
      isGrAuthor
    }
    role
  }
  fragment BookPageDetails on BookDetails {
    asin
    format
    numPages
    publicationTime
    publisher
    isbn
    isbn13
    language {
      name
    }
  }
  fragment ChoiceAwardsFragment on Award {
    awardedAt
    category
    designation
    webUrl
  }
  fragment WorkDetailsFragment on WorkDetails {
    webUrl
    shelvesUrl
    publicationTime
    originalTitle
    awardsWon {
      name
      webUrl
      awardedAt
      category
      designation
    }
    places {
      name
      countryName
      webUrl
      year
    }
    characters {
      name
      webUrl
    }
  }
  fragment BookPageWorkStats on BookOrWorkStats {
    averageRating
    ratingsCount
    ratingsCountDist
    textReviewsCount
    # textReviewsLanguageCounts {
    #   count
    #   isoLanguageCode
    # }
  }
  query getBookByLegacyId($legacyBookId: Int!) {
    getBookByLegacyId(legacyId: $legacyBookId) {
      links {
          primaryAffiliateLink {
            __typename
              name
              url
          }
          secondaryAffiliateLinks {
              __typename
              name
              url
          }
          seriesLink {
              __typename
              name
              url
          }
      }
      title
      titleComplete
      id
      legacyId
      webUrl
      description
      descriptionStripped: description(stripped: true)
      primaryContributorEdge {
        ...DetailedContributorFragment
      }
      secondaryContributorEdges {
        ...BasicContributorFragment
      }
      imageUrl
      bookSeries {
        userPosition
        series {
          id
          title
          webUrl
        }
      }
      bookGenres {
        genre {
          name
          webUrl
        }
      }
      details {
        ...BookPageDetails
      }
      work {
        id
        legacyId
        bestBook {
          id
          legacyId
          webUrl
        }
        choiceAwards {
          ...ChoiceAwardsFragment
        }
        details {
          ...WorkDetailsFragment
        }
        stats {
          ...BookPageWorkStats
        }
        quotes(pagination: { limit: 1 }) {
          webUrl
          totalCount
        }
        questions(pagination: { limit: 1 }) {
          totalCount
          webUrl
        }
        topics(pagination: { limit: 1 }) {
          webUrl
          totalCount
        }
        # viewerShelvings {
        #   ...ViewerShelvingFragment
        # }
        viewerShelvingsUrl
      }
      reviewEditUrl
    }
  }
`;

export const getBookByLegacyIdSchema = z.object({
	getBookByLegacyId: z.object({
		__typename: z.string(),
		links: z.object({
			primaryAffiliateLink: z.object({
				_typename: z.string(),
				name: z.string(),
				url: z.string(),
			}),
			secondaryAffiliateLinks: z.array(
				z.object({ _typename: z.string(), name: z.string(), url: z.string() }),
			),
			serieseriesLinksLink: z.array(
				z.object({ _typename: z.string(), name: z.string(), url: z.string() }),
			),
		}),
		title: z.string(),
		titleComplete: z.string(),
		id: z.string(),
		legacyId: z.number(),
		webUrl: z.string(),
		description: z.string(),
		descriptionStripped: z.string(),
		primaryContributorEdge: z.object({
			__typename: z.string(),
			node: z.object({
				__typename: z.string(),
				id: z.string(),
				legacyId: z.number(),
				name: z.string(),
				description: z.string(),
				isGrAuthor: z.boolean(),
				works: z.object({ __typename: z.string(), totalCount: z.number() }),
				profileImageUrl: z.string(),
				webUrl: z.string(),
				user: z.object({
					__typename: z.string(),
					id: z.number(),
					followersCount: z.number(),
				}),
			}),
			role: z.string(),
		}),
		secondaryContributorEdges: z.array(z.unknown()),
		imageUrl: z.string(),
		bookSeries: z.array(
			z.object({
				__typename: z.string(),
				userPosition: z.string(),
				series: z.object({
					__typename: z.string(),
					id: z.string(),
					title: z.string(),
					webUrl: z.string(),
				}),
			}),
		),
		bookGenres: z.array(
			z.object({
				__typename: z.string(),
				genre: z.object({
					__typename: z.string(),
					name: z.string(),
					webUrl: z.string(),
				}),
			}),
		),
		details: z.object({
			__typename: z.string(),
			asin: z.string(),
			format: z.string(),
			numPages: z.number(),
			publicationTime: z.number(),
			publisher: z.string(),
			isbn: z.string(),
			isbn13: z.string(),
			language: z.object({ __typename: z.string(), name: z.string() }),
		}),
		work: z.object({
			__typename: z.string(),
			id: z.string(),
			legacyId: z.number(),
			bestBook: z.object({
				__typename: z.string(),
				id: z.string(),
				legacyId: z.number(),
				webUrl: z.string(),
			}),
			choiceAwards: z.array(z.unknown()),
			details: z.object({
				__typename: z.string(),
				webUrl: z.string(),
				shelvesUrl: z.string(),
				publicationTime: z.number(),
				originalTitle: z.string(),
				awardsWon: z.array(
					z.union([
						z.object({
							__typename: z.string(),
							name: z.string(),
							webUrl: z.string(),
							awardedAt: z.number(),
							category: z.string(),
							designation: z.string(),
						}),
						z.object({
							__typename: z.string(),
							name: z.string(),
							webUrl: z.string(),
							awardedAt: z.number(),
							category: z.null(),
							designation: z.string(),
						}),
					]),
				),
				places: z.array(z.unknown()),
				characters: z.array(
					z.object({
						__typename: z.string(),
						name: z.string(),
						webUrl: z.string(),
					}),
				),
			}),
			stats: z.object({
				__typename: z.string(),
				averageRating: z.number(),
				ratingsCount: z.number(),
				ratingsCountDist: z.array(z.number()),
				textReviewsCount: z.number(),
			}),
			quotes: z.object({
				__typename: z.string(),
				webUrl: z.string(),
				totalCount: z.number(),
			}),
			questions: z.object({
				__typename: z.string(),
				totalCount: z.number(),
				webUrl: z.string(),
			}),
			topics: z.object({
				__typename: z.string(),
				webUrl: z.string(),
				totalCount: z.number(),
			}),
			viewerShelvingsUrl: z.string(),
		}),
		reviewEditUrl: z.string(),
	}),
});

export type GetBookByLegacyIdSchema = Zod.infer<typeof getBookByLegacyIdSchema>;
