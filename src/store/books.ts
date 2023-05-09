import type { ReadingStatus } from "@/types/misc";
import RawBook from "@/types/rawBook";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// import { devtools, persist } from "zustand/middleware";

interface BookState {
  books: {
    [key: string]: {
      status: ReadingStatus;
      info: RawBook;
    };
  };
  addBook: (id: ReadingStatus, payload: RawBook) => void;
}

export const o: RawBook = {
  ratingsCountDist: [1029, 1212, 12222, 342554, 433434],
  bookId: 10000,
  title: "The Lies of Locke Lamora",
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1458646334i/29588376.jpg",
  description:
    "An orphan’s life is harsh—and often short—in the mysterious island city of Camorr. But young Locke Lamora dodges death and slavery, becoming a thief under the tutelage of a gifted con artist. As leader of the band of light-fingered brothers known as the Gentleman Bastards, Locke is soon infamous, fooling even the underworld’s most feared ruler. But in the shadows lurks someone still more ambitious and deadly. Faced with a bloody coup that threatens to destroy everyone and everything that holds meaning in his mercenary life, Locke vows to beat the enemy at his own brutal game—or die trying.",
  averageRating: 4.3,
  ratingsCount: 274760,
  textReviewsCount: 18906,
  genres: [
    {
      name: "Fantasy",
      webUrl: "https://www.goodreads.com/genres/fantasy",
    },
    {
      name: "Fiction",
      webUrl: "https://www.goodreads.com/genres/fiction",
    },
    {
      name: "Adventure",
      webUrl: "https://www.goodreads.com/genres/adventure",
    },
    {
      name: "High Fantasy",
      webUrl: "https://www.goodreads.com/genres/high-fantasy",
    },
    {
      name: "Adult",
      webUrl: "https://www.goodreads.com/genres/adult",
    },
    {
      name: "Epic Fantasy",
      webUrl: "https://www.goodreads.com/genres/epic-fantasy",
    },
    {
      name: "Audiobook",
      webUrl: "https://www.goodreads.com/genres/audiobook",
    },
    {
      name: "Science Fiction Fantasy",
      webUrl: "https://www.goodreads.com/genres/science-fiction-fantasy",
    },
    {
      name: "Mystery",
      webUrl: "https://www.goodreads.com/genres/mystery",
    },
    {
      name: "Crime",
      webUrl: "https://www.goodreads.com/genres/crime",
    },
  ],
  authorName: "Scott Lynch",
  similarBooksUrl: "2116675",
};

export const useBookStore = create<BookState>()(
  devtools(
    persist(
      (set) => ({
        books: {},
        addBook: (status, payload) =>
          // TODO: only store the { title, imageUrl, bookId }
          set((state) => {
            state.books[payload.bookId] = {
              status,
              info: payload,
            };

            return { ...state };
          }),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);
