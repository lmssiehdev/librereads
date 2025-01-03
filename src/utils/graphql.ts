import {
	type GetBookByLegacyIdSchema,
	getBookByLegacyId,
} from "./query/getBookByLegacyId";
import type { GetBookListsOfBook } from "./query/getBookListsOfBook";
import {
	type GetSimilarBooksSchema,
	getSimilarBooks,
} from "./query/getSimilarBook";
import type { GetWorksByContributor } from "./query/getWorksByContributor";
import type { GetWorkForSeries } from "./query/getWorksForSeries";

async function fetchQuery({
	query,
	variables,
}: {
	query: string;
	variables: Record<string, unknown>;
}) {
	return fetch(
		"https://kxbwmqov6jgg3daaamb744ycu4.appsync-api.us-east-1.amazonaws.com/graphql",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "da2-xpgsdydkbregjhpr6ejzqdhuwy",
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		},
	);
}

export async function fetchSimilarBooks(
	id: string,
): Promise<GetSimilarBooksSchema | undefined> {
	try {
		const response = await fetchQuery({
			query: getSimilarBooks,
			variables: {
				id,
				limit: 20,
			},
		});
		const { data } = await response.json();
		return data;
	} catch (err) {
		console.error("failed to parse response", err);
	}
}

export async function fetchBookDataByLegacyId(
	legacyBookId: string,
): Promise<GetBookByLegacyIdSchema | undefined> {
	try {
		const response = await fetchQuery({
			query: getBookByLegacyId,
			variables: {
				legacyBookId,
			},
		});
		const { data } = await response.json();
		return data;
	} catch (err) {
		console.error("failed to parse response", err);
	}
}

export async function fetchBookRelatedData({
	authorId,
	bookId,
	seriesId,
}: {
	bookId: string;
	seriesId: string;
	authorId: string;
}): Promise<
	| {
			getBookListsOfBook: GetBookListsOfBook["getBookListsOfBook"];
			getWorksByContributor: GetWorksByContributor["getWorksByContributor"];
			getSimilarBooks: GetSimilarBooksSchema["getSimilarBooks"];
			getWorksForSeries: GetWorkForSeries["getWorksForSeries"];
	  }
	| undefined
> {
	try {
		const response = await fetch(
			"https://kxbwmqov6jgg3daaamb744ycu4.appsync-api.us-east-1.amazonaws.com/graphql",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Api-Key": "da2-xpgsdydkbregjhpr6ejzqdhuwy",
				},
				body: JSON.stringify({
					query: `
            query GetBooks($similarBookId: ID!, $similarBookLimit: Int!, $getWorksForSeriesInput: GetWorksForSeriesInput!, $pagination: PaginationInput, $getWorksByContributorInput: GetWorksByContributorInput!, $WorksByContributorPagination: PaginationInput, $bookListId: ID!, $listsOfBookLimit: Int!) {
              getBookListsOfBook(id: $bookListId, paginationInput: { limit: $listsOfBookLimit }) {
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
                        }
                      }
                    }
                  }
                }
              }
              getWorksByContributor(
                getWorksByContributorInput: $getWorksByContributorInput
                pagination: $WorksByContributorPagination
              ) {
                edges {
                  node {
                    id
                    stats {
                      averageRating
                      ratingsCount
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
                        }
                      }
                    }
                  }
                }
              }
              getSimilarBooks(id: $similarBookId, pagination: { limit: $similarBookLimit }) {
                webUrl
                edges {
                  node {
                    legacyId
                    title
                    imageUrl
                    webUrl
                    primaryContributorEdge {
                      node {
                        name
                        legacyId
                      }
                    }
                    work {
                      stats {
                        averageRating
                        ratingsCount
                      }
                    }
                  }
                }
              }
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
                        }
                      }
                    }
                  }
                }
              }
            }`,
					variables: {
						similarBookId: bookId,
						bookListId: bookId,
						getWorksForSeriesInput: {
							id: seriesId,
							isPrimary: true,
						},
						getWorksByContributorInput: {
							id: authorId,
						},
						similarBookLimit: 4,
						pagination: {
							limit: 4,
						},
						WorksByContributorPagination: {
							limit: 4,
						},
						listsOfBookLimit: 4,
					},
				}),
			},
		);
		const { data } = await response.json();
		return data;
	} catch (err) {
		console.error("failed to parse response", err);
	}
}
