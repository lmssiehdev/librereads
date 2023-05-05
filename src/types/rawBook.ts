export default interface RawBook {
  title: string;
  imageUrl: string;
  description: string;
  averageRating: number;
  ratingsCount: number;
  textReviewsCount: number;
  genres: Array<{
    name: string;
    webUrl: string;
  }>;
  authorName: string;
  similarBooksUrl: string;
}
