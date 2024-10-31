export interface RawAuthor {
	author: {
		name: string;
		image: string;
		description: string;
	};
	books: Array<{
		bookTitle: string;
		bookCover: string;
		bookRating: string;
		bookId: string;
	}>;
}
