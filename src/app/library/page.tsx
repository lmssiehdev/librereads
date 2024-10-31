"use client";

import { BookCard } from "@/components/BookCard";
import { useBookStore } from "@/store/books";
import type { ReadingStatus } from "@/types/misc";
import type RawBook from "@/types/rawBook";

export default function LibraryPage() {
	const book = useBookStore((state) => state.books);
	const t: {
		[key in ReadingStatus]: {
			status: ReadingStatus;
			info: RawBook;
		}[];
	} = {
		"Want To Read": [],
		Read: [],
		Reading: [],
	};

	Object.entries(book).forEach(([key, value]) => {
		t[value.status].push(value);
	});

	return (
		<div>
			<div>
				{Object.keys(book).length <= 0 ? (
					<div className="py-10 text-center">
						Start building your library. Add a book now!
					</div>
				) : (
					<div>
						{(Object.keys(t) as ReadingStatus[]).map((key) => {
							return (
								<>
									{t[key].length > 0 ? (
										<>
											<h3 className="text-lg pb-1 py-5"> {key} </h3>

											<div className="grid grid-cols-[repeat(auto-fit,minmax(145px,180px))] justify-center md:gap-x-1 md:gap-y-3 gap-x-3 gap-y-6">
												{t[key].map(({ info: { title, imageUrl, bookId } }) => {
													return (
														<div key={title} className="">
															<BookCard
																title={title}
																imageUrl={imageUrl}
																bookId={bookId}
															/>
														</div>
													);
												})}
											</div>
										</>
									) : null}
								</>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
