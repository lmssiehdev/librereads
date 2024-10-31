import { GetBookByLegacyIdSchema } from "@/query/getBookByLegacyId";
import {
	type GetSimilarBooksSchema,
	getSimilarBooks,
} from "@/query/getSimilarBooks";
import { client } from "@/utils/apollo-client";
import { gql } from "@apollo/client";
import * as cheerio from "cheerio";
import Link from "next/link";

interface SimilarBook {
	book: {
		imageUrl: string;
		bookId: number;
		title: string;
		avgRating: number;
	};
}

interface JSONSimilarBooks {
	similarBooks: Array<SimilarBook>;
}

async function fetchSimilarBooks(id = 8134945) {
	try {
		const response = await fetch(`https://goodreads.com/book/similar/${id}`);
		const data = await response.text();
		const $ = cheerio.load(data);
		const rawHTML = $("body").html();

		const rawData = $("[data-react-props]:not(:first-child)").attr(
			"data-react-props",
		) as string;

		const { similarBooks } = JSON.parse(rawData) as JSONSimilarBooks;

		const formatedBooks = Object.values(similarBooks).map(({ book }) => {
			const { imageUrl, bookId, avgRating, title } = book;

			return {
				imageUrl,
				bookId,
				avgRating,
				title,
			};
		});

		console.log(formatedBooks);
		return formatedBooks;
	} catch (err) {
		console.error(err);
	}
}

export default async function SimilarBooks({ id }: { id: string }) {
	const { data } = await client.query<GetSimilarBooksSchema>({
		query: getSimilarBooks,
		variables: {
			limit: 20,
			id: id.toString(),
		},
	});

	const result: Array<SimilarBook["book"]> = data.getSimilarBooks.edges.map(
		({ node: { imageUrl, title, legacyId, work } }) => ({
			imageUrl,
			title,
			avgRating: work.stats.averageRating,
			bookId: legacyId,
		}),
	);

	if (!result) return <div>yikes! there was an error, please try again.</div>;

	return (
		<>
			{result.map(({ bookId, title, imageUrl }) => {
				return (
					<div key={bookId} className="mx-auto">
						<div className="h-[180px] w-[120px] mx-auto">
							<picture>
								<img
									className="inline-block h-full w-full"
									src={imageUrl}
									alt={`${title} book cover`}
									loading="lazy"
								/>
							</picture>
						</div>
						<Link
							className="my-2 text-sm text-center line-clamp-2"
							href={`/book/${bookId}`}
						>
							{title}
						</Link>
					</div>
				);
			})}
		</>
	);
}
