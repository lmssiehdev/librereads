import type { RawAuthor } from "@/types/rawAuthor";
import { changeGoodreadsImageSize, getErrorMessage } from "@/utils/misc";
import * as cheerio from "cheerio";

export async function fetchAuthorDetails(id = "432.Ayn_Rand") {
	try {
		const res = await fetch(`https://goodreads.com/author/show/${id}`, {
			method: "GET",
			headers: new Headers({
				"User-Agent": process.env.AXIOS_USERAGENT as string,
			}),
			next: { tags: ["book"] },
		});

		const htmlString = await res.text();
		const $ = cheerio.load(htmlString);

		const r: RawAuthor = {
			author: {
				image: $(" .authorLeftContainer > a img").attr("src") as string,
				name: $("h1.authorName span").text(),
				description: $(
					".aboutAuthorInfo [id^=freeTextContainerauthor]",
				).html() as string,
			},
			books: Array.from($("table.stacked tbody tr")).map((node) => {
				const ele = $(node);
				return {
					bookTitle: ele.find(".bookTitle span").text(),
					bookId: ele.find(".bookTitle").attr("href") as string,
					bookCover: changeGoodreadsImageSize(
						ele.find("img.bookCover")?.attr("src") as string,
						200,
					),
					bookRating: ele.find(".minirating").text(),
				} as const;
			}),
		};

		if (r.author.name !== "") return r;
		fetchAuthorDetails(id);
	} catch (e) {
		console.log(getErrorMessage);
	}
}
