import { JSDOM } from "jsdom";
import { changeGoodreadsImageSize, extractIdFromUrl } from "../goodreads";

export type BookData = Awaited<ReturnType<typeof extractBookData>>;
export type ListData = Awaited<ReturnType<typeof extractListsData>>;

export async function fetchSearchResult<T extends BookData | ListData>(
	searchQuery: string,
	searchType: "books" | "lists" = "books",
	page = 1,
) {
	try {
		const res = await fetch(
			`https://goodreads.com/search?page=${page}&q=${searchQuery}&search_type=${searchType}`,
			{
				method: "GET",
				headers: new Headers({
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
				}),
			},
		);

		const html = await res.text();
		const dom = new JSDOM(html);
		const document = dom.window.document;
		const extractFunction =
			searchType === "lists" ? extractListsData : extractBookData;
		return extractFunction(document) as T;
	} catch (err) {
		console.error(err);
		return [] as unknown as T;
	}
}

function extractBookData(document: Document) {
	const rows = document.querySelectorAll("tbody tr");
	const hasNextPage =
		document.querySelector(".next_page") != null &&
		!document.querySelector(".next_page")?.classList.contains("disabled");
	const hasPreviousPage =
		document.querySelector(".previous_page") != null &&
		!document.querySelector("previous_page")?.classList.contains("disabled");
	const searchCount =
		document
			.querySelector(".searchSubNavContainer")
			?.textContent?.trim()
			.split("(")[0] || "";

	return {
		hasNextPage,
		hasPreviousPage,
		searchCount,
		rows: Array.from(rows).map((element) => {
			const title =
				element.querySelector(".bookTitle span")?.textContent?.trim() || "";
			const authorName =
				element.querySelector(".authorName span")?.textContent?.trim() || "";
			const authorId =
				extractIdFromUrl(
					element.querySelector(".authorName")?.getAttribute("href") || "",
				) || "";

			const bookCover = element.querySelector(".bookCover");
			const imageUrl = bookCover
				?.getAttribute("src")
				?.replace(/\._.*?\.jpg/g, ".jpg");

			const bookTitleLink = element.querySelector(".bookTitle");
			const bookIdMatch = bookTitleLink
				?.getAttribute("href")
				?.match(/\/book\/show\/(\d+)/);
			const bookId = bookIdMatch ? bookIdMatch[1] : undefined;
			const ratings =
				element
					.querySelector(".minirating")
					?.textContent?.trim()
					.toLocaleLowerCase()
					.split(" — ")
					.map((v) =>
						v
							.split("")
							.filter((v) => !"abcdefghijklmnopqrstuvwxyz".includes(v))
							.join("")
							.trim(),
					) ?? [];

			return {
				title,
				authorName,
				authorId,
				imageUrl: imageUrl || undefined,
				bookId: bookId ? Number(bookId) : undefined,
				ratings,
			};
		}),
	};
}
function extractListsData(document: Document) {
	const rows = document.querySelectorAll("tbody tr");
	const searchCount =
		document.querySelector(".searchSubNavContainer")?.textContent?.trim() || "";
	const hasNextPage =
		document.querySelector(".next_page") != null &&
		!document.querySelector(".next_page")?.classList.contains("disabled");
	const hasPreviousPage =
		document.querySelector(".previous_page") != null &&
		!document.querySelector("previous_page")?.classList.contains("disabled");

	return {
		hasNextPage,
		hasPreviousPage,
		searchCount,
		rows: Array.from(rows).map((element) => {
			const title =
				element.querySelector(".listTitle")?.textContent?.trim() || "";
			const booksInList =
				element.querySelector(".listFullDetails")?.textContent?.trim() || "";
			const listUrl =
				element.querySelector(".listTitle")?.getAttribute("href") || "";
			const list = Array.from(element.querySelectorAll(".listImgs a")).map(
				(bookElement) => {
					return {
						bookUrl: bookElement.getAttribute("href") || "",
						bookCover: changeGoodreadsImageSize(
							bookElement.querySelector("img")?.getAttribute("src") || "",
							200,
						),
					};
				},
			);

			return {
				title,
				list,
				booksInList,
				listUrl,
			};
		}),
	};
}
