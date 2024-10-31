import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
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
