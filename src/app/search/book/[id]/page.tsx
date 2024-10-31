import { BookCard } from "@/components/BookCard";
import * as cheerio from "cheerio";

type searchResult = Awaited<ReturnType<typeof fetchSearchResult>>;

async function fetchSearchResult(searchQuery = "") {
	try {
		const res = await fetch(
			`https://goodreads.com/search?page=1&q=${searchQuery}`,
			{
				method: "GET",
				headers: new Headers({
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
				}),
			},
		);

		const html = await res.text();
		const $ = cheerio.load(html);

		return Array.from($("tbody tr")).map((element) => {
			const $book = $(element);

			const title = $book.find(".bookTitle span").text();
			const authorName = $book.find(".authorName span").text();
			const imageUrl = $book
				.find(".bookCover")
				.attr("src")
				?.replace(/\._.*?\.jpg/g, ".jpg");
			const bookIdMatch = $book
				.find(".bookTitle")
				.attr("href")
				?.match(/\/book\/show\/(\d+)/);
			const bookId = bookIdMatch ? bookIdMatch[1] : undefined;

			return {
				title,
				authorName,
				imageUrl: imageUrl as string,
				bookId: Number(bookId),
			} as const;
		});
	} catch (err) {
		console.error(err);
	}
}

export default async function Book({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const searchQuery = params.id;

	const searchResult = await fetchSearchResult(searchQuery);

	if (searchQuery === "") return <div>Please search</div>;

	return <BookSearchResult result={searchResult} />;
}

function BookSearchResult({ result }: { result: searchResult }) {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(145px,180px))] justify-center md:gap-x-1 md:gap-y-3 gap-x-3 gap-y-6">
			{result?.map(({ title, bookId, imageUrl }) => {
				return (
					<div key={title}>
						<BookCard {...{ title, bookId, imageUrl }} />
					</div>
				);
			})}
		</div>
	);
}
