import { jsx } from "astro/jsx-runtime";
import { deselectScripts } from "astro/virtual-modules/transitions-swap-functions.js";
import { JSDOM } from "jsdom";
import { z } from "zod";

export interface SeriesData {
	series: {
		isLibrarianView: boolean;
		book: {
			imageUrl: string;
			bookId: string;
			workId: string;
			bookUrl: string;
			from_search: boolean;
			from_srp: boolean;
			rank: null | string;
			title: string;
			bookTitleBare: string;
			numPages: number;
			avgRating: number;
			ratingsCount: number;
			author: {
				id: number;
				name: string;
				isGoodreadsAuthor: boolean;
				profileUrl: string;
				worksListUrl: string;
			};
			description: {
				truncatedHtml: string;
				html: string;
			};
			textReviewsCount: number;
			publicationDate: string;
			toBePublished: boolean;
			editions: string;
			editionsUrl: string;
		};
	}[];
	seriesHeaders: string[];
}

export const rootSchema = z
	.object({
		author: z.object({
			id: z.number(),
			name: z.string(),
			isGoodreadsAuthor: z.boolean(),
		}),
		bookId: z.string(),
		title: z.string(),
		imageUrl: z.string(),
		numPages: z.number().nullable(),
		avgRating: z.number(),
		ratingsCount: z.number(),
		description: z.object({
			truncatedHtml: z.string().optional(),
		}),
	})
	.optional()
	.catch({
		author: {
			name: "",
			isGoodreadsAuthor: false,
			id: 0,
		},
		bookId: "",
		title: "",
		imageUrl: "",
		numPages: null,
		avgRating: 0,
		ratingsCount: 0,
		description: {
			truncatedHtml: "",
		},
	});

export async function fetchAllBooksInSeries(id: string) {
	try {
		const res = await fetch(`https://goodreads.com/series/${id}`, {
			method: "GET",
			headers: new Headers({
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
			}),
		});
		const htmlString = await res.text();
		const dom = new JSDOM(htmlString);
		const document = dom.window.document;

		const seriesDataEle = Array.from(
			document.querySelectorAll(
				`[data-react-class='ReactComponents.SeriesList']`,
			),
		);

		const result = seriesDataEle.map((ele) => {
			const data = ele.getAttribute("data-react-props");
			if (data === null) {
				return;
			}
			const result = [] as {
				seriesHeader: string;
				series: z.infer<typeof rootSchema>;
			}[];
			const json: SeriesData = JSON.parse(data);
			for (let i = 0; i < json.series.length; i++) {
				const data = json.series[i];
				result.push({
					seriesHeader: json.seriesHeaders[i],
					series: rootSchema.parse(data.book) as z.infer<typeof rootSchema>,
				});
			}
			return result;
		});
		const pageDescriptionEle = document.querySelector(
			".u-paddingBottomSmall .expandableHtml span",
		);
		return {
			seo: {
				title: document.title,
				description:
					`${pageDescriptionEle?.textContent?.substring(0, 153).trim()}...` ||
					"",
			},
			seriesTitle: document.querySelector("h1")?.textContent || "",
			seriesSubtitle:
				document.querySelector(".responsiveSeriesHeader__subtitle")
					?.textContent || "",
			pageDescriptionHTML: pageDescriptionEle?.innerHTML || "",
			listData: result.flat(),
		};
	} catch (e) {
		console.log(e);
	}
}
