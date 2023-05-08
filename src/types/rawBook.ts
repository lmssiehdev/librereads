export default interface RawBook {
  title: string;
  imageUrl: string;
  description: string;
  averageRating: number;
  ratingsCount: number;
  textReviewsCount: number;
  ratingsCountDist: number[];
  genres: Array<{
    name: string;
    webUrl: string;
  }>;
  authorName: string;
  similarBooksUrl?: string;
  bookId: number;
}
