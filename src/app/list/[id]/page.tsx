import { fetchListDetails } from "@/utils/scrapers/list";
import Image from "next/image";
import Link from "next/link";

export default async function ListPage({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const result = await fetchListDetails(params.id);

	return (
		<>
			<div>
				<h1 className="text-4xl my-10 ">
					<span className=" text-slate-600 ">List:</span> {result?.title}
				</h1>
				<div className="flex flex-col gap-2">
					{result?.books.map((book) => {
						const { bookTitle, bookRating, bookAuthor, bookCover, bookId } =
							book;
						return (
							<div key={book.bookId} className="flex gap-3">
								<div className="h-[100px] w-[70px]">
									<picture>
										<Image
											unoptimized
											height={100}
											width={70}
											className="w-full h-full object-fill"
											src={bookCover}
											alt={`${bookTitle}'s cover`}
										/>
									</picture>
								</div>
								<div>
									<Link href={`/book/${bookId}`} className="text-lg">
										{bookTitle}
									</Link>
									<div>
										<span className=" text-slate-700">
											by:
											<Link href={`/author/${bookAuthor.id}`}>
												<span className="opacity-60"> {bookAuthor.name} </span>
											</Link>
										</span>
									</div>
									<span className="text-xs text-slate-600"> {bookRating} </span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);

	return <>{JSON.stringify(result)}</>;
}
