import type { ReadingStatus } from "@/types/misc";
import type RawBook from "@/types/rawBook";
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
	removeBook: (id: string | number) => void;
}

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
				removeBook: (id) =>
					// TODO: only store the { title, imageUrl, bookId }
					set((state) => {
						delete state.books[id];

						return { ...state };
					}),
			}),
			{
				name: "bear-storage",
			},
		),
	),
);
