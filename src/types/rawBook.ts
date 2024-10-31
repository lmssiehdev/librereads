export default interface RawBook {
	title: string;
	imageUrl: string;
	description: string;
	averageRating: number;
	ratingsCount: number | string;
	textReviewsCount: number;
	ratingsCountDist: Array<Record<"percentage" | "reviews", string>>;
	genres: Array<{
		name: string;
		webUrl: string;
	}>;
	authors: Array<{
		name: string;
		id: string;
	}>;
	similarBooksUrl?: string;
	bookId: number;
	bookDetails?: {
		pagesFormat: string;
	};
}
