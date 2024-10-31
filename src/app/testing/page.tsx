import { getBookByLegacyId } from "@/query/getBookByLegacyId";
import { getBookListsOfBook } from "@/query/getBookListsOfBook";
import { getSimilarBooks } from "@/query/getSimilarBooks";
import { getWorksByContributor } from "@/query/getWorksByContributor";
import { getReviewsQuery } from "@/query/reviews";
import { getUserQuery } from "@/query/user";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
	ssrMode: true,
	link: createHttpLink({
		uri: "https://kxbwmqov6jgg3daaamb744ycu4.appsync-api.us-east-1.amazonaws.com/graphql",
		credentials: "same-origin",
		headers: {
			"X-Api-Key": process.env.API_KEY!,
		},
	}),
	cache: new InMemoryCache(),
});

export default async function Page() {
	try {
		// const { data } = await client.query({
		//   query: getReviewsQuery,
		//   variables: {
		//     filters: {
		//       resourceType: "WORK",
		//       resourceId: "kca://work/amzn1.gr.work.v1.H-uiZxbMDAHsxOpFwGVKGQ",
		//     },
		//     pagination: {
		//       limit: 30,
		//     },
		//   },
		// });

		// const { data } = await client.query({
		//   query: getWorksByContributor,
		//   variables: {
		//     getWorksByContributorInput: {
		//       id: "kca://author/amzn1.gr.author.v1.OK_X6rOc-ss75X962O9SPw",
		//     },
		//     pagination: {
		//       limit: 20, // limit
		//     },
		//   },
		// });

		const { data } = await client.query({
			query: getSimilarBooks,
			variables: {
				limit: 20, // max 20?
				id: "kca://book/amzn1.gr.book.v1.iUoduJh08Drcwhc9Kt94qg",
			},
		});
		return (
			<div>
				Something
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		);
	} catch (err) {
		return <>{JSON.stringify(err, null, 2)}</>;
	}
}
