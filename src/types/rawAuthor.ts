export interface RawAuthor {
  author: {
    name: string;
    image: string;
  };
  books: Array<{
    bookTitle: string;
    bookCover: string;
    bookRating: string;
  }>;
}
