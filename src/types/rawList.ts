export interface rawList {
  title: string;
  books: Array<{
    bookTitle: string;
    bookCover: string;
    bookRating: string;
    bookId: string;
    bookAuthor: string;
  }>;
}
