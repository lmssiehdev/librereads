import { z } from "zod";

export async function queryClient<T>(
	query: string,
	variables: unknown,
): Promise<T | undefined> {
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
					query,
					variables,
				}),
			},
		);
		const { data } = await response.json();
		return data;
	} catch (err) {
		console.error("failed to parse response", err);
	}
}
