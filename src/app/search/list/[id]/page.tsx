import { changeGoodreadsImageSize } from "@/utils/misc";
import * as cheerio from "cheerio";
import Link from "next/link";

type searchResult = Awaited<ReturnType<typeof fetchSearchResult>>;

async function fetchSearchResult(searchQuery = "") {
	try {
		const res = await fetch(
			`https://goodreads.com/search?search?page=1&q=${searchQuery}&search_type=lists`,
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
			const $list = $(element);

			const title = $list.find(".listTitle").text();
			const booksInList = $list.find(".listFullDetails").text();
			const listUrl = $list.find(".listTitle").attr("href") as string;
			const list = Array.from($list.find(".listImgs a")).map((element) => {
				const $book = $(element);

				return {
					bookUrl: $book.find("a").attr("href") as string,
					bookCover: changeGoodreadsImageSize(
						$book.find("img").attr("src") as string,
						200,
					),
				};
			});

			return {
				title,
				list,
				booksInList,
				listUrl,
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

	return <ListSearchResult result={searchResult} />;
}

function ListSearchResult({ result }: { result: searchResult }) {
	return (
		<div>
			<div>
				{result?.map((listItem) => {
					return (
						<div key={listItem.title} className="my-4 rounded overflow-hidden">
							<div className="rounded overflow-hidden w-fit grid gap-1 grid-cols-5">
								{listItem.list.map((book) => {
									return (
										<picture key={book.bookCover}>
											<img
												className="first:mr-0 -mr-4 hover:mr-0  cursor-pointer transition-all h-full w-full max-w-[250px] object-fill"
												src={book.bookCover}
												alt={`${listItem.title}'s cover`}
											/>
										</picture>
									);
								})}
							</div>
							<div className="my-1">
								<Link href={listItem.listUrl}>
									<h2>{listItem.title}</h2>
								</Link>
								<span className="text-sm text-slate-600">
									{listItem.booksInList}
								</span>
							</div>
						</div>
					);
				})}
				{JSON.stringify(result)}
			</div>
		</div>
	);
}
