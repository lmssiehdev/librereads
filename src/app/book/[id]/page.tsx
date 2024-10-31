import {
	type GetBookByLegacyIdSchema,
	getBookByLegacyId,
} from "@/query/getBookByLegacyId";
import {
	type GetWorksByContributor,
	getWorksByContributor,
} from "@/query/getWorksByContributor";
import {
	type GetWorkForSeries,
	getWorksForSeries,
} from "@/query/getWorksForSeries";
import { client } from "@/utils/apollo-client";
import { BOOK_WITH_NO_COVER } from "@/utils/constants";
import { fetchBookDetails } from "@/utils/scrapers/book";
import Link from "next/link";
import { Suspense } from "react";
import { EmblaCarousel } from "./EmblaCarousel";
import BookInfo from "./getBook";
import SimilarBooks from "./similarBooks";

export default async function Page({
	params,
}: {
	params: {
		id: number;
	};
}) {
	const { data } = await client.query<GetBookByLegacyIdSchema>({
		query: getBookByLegacyId,
		variables: {
			legacyBookId: params.id,
		},
	});

	return (
		<div>
			<BookInfo data={data.getBookByLegacyId} />
			<EmblaCarousel title="Readers also enjoyed">
				<Suspense fallback={<div>loading...</div>}>
					<SimilarBooks id={data.getBookByLegacyId.id} />
				</Suspense>
			</EmblaCarousel>

			{data.getBookByLegacyId.bookSeries.length > 0 && (
				<BookSeries
					seriesTitle={data.getBookByLegacyId.bookSeries[0].series.title}
					seriesId={data.getBookByLegacyId.bookSeries[0].series.id}
				/>
			)}
			{
				<BooksByAuthor
					authorName={data.getBookByLegacyId.primaryContributorEdge.node.name}
					authorId={data.getBookByLegacyId.primaryContributorEdge.node.id}
				/>
			}
		</div>
	);
}

async function BookSeries({
	seriesTitle,
	seriesId,
}: {
	seriesTitle: string;
	seriesId: string;
}) {
	const { data } = await client.query<GetWorkForSeries>({
		query: getWorksForSeries,
		variables: {
			getWorksForSeriesInput: {
				id: seriesId,
				isPrimary: true,
			},
			pagination: {
				limit: 20,
			},
		},
	});
	const result = data.getWorksForSeries.edges.map(
		({
			seriesPlacement,
			isPrimary,
			node: {
				bestBook: { imageUrl, title, webUrl, legacyId },
			},
		}) => ({
			seriesPlacement,
			isPrimary,
			imageUrl,
			title,
			webUrl,
			bookId: legacyId,
		}),
	);

	return (
		<>
			<h3 className="text-xl py-4"></h3>
			<EmblaCarousel title={`${seriesTitle} Series`}>
				{result.map(({ bookId, title, imageUrl, seriesPlacement }) => {
					return (
						<div key={bookId}>
							<div className="h-[180px] w-[120px] ">
								<picture>
									<img
										className="inline-block h-full w-full"
										src={imageUrl ? imageUrl : BOOK_WITH_NO_COVER}
										alt={`${title} book cover`}
										loading="lazy"
									/>
								</picture>
							</div>
							<div className="my-2 text-sm">
								{seriesPlacement && (
									<div className="opacity-60">#{seriesPlacement}</div>
								)}
								<Link
									className="line-clamp-2 hover:underline hover:underline-offset-4"
									href={`/book/${bookId}`}
								>
									{title}
								</Link>
							</div>
						</div>
					);
				})}
			</EmblaCarousel>
		</>
	);
}

async function BooksByAuthor({
	authorName,
	authorId,
}: {
	authorName: string;
	authorId: string;
}) {
	const { data } = await client.query<GetWorksByContributor>({
		query: getWorksByContributor,
		variables: {
			getWorksByContributorInput: {
				id: authorId,
			},
			pagination: {
				limit: 20,
			},
		},
	});
	const result = data.getWorksByContributor.edges.map(
		({
			node: {
				stats: { averageRating, ratingsCount },
				bestBook: { imageUrl, title, webUrl, legacyId },
			},
		}) => ({
			imageUrl,
			title,
			webUrl,
			bookId: legacyId,
		}),
	);

	return (
		<>
			<h3 className="text-xl py-4"></h3>
			<EmblaCarousel title={`Other books by ${authorName}`}>
				{result.map(({ bookId, title, imageUrl }) => {
					return (
						<div key={bookId}>
							<div className="h-[180px] w-[120px] ">
								<picture>
									<img
										className="inline-block h-full w-full"
										src={imageUrl ? imageUrl : BOOK_WITH_NO_COVER}
										alt={`${title} book cover`}
										loading="lazy"
									/>
								</picture>
							</div>
							<div className="my-2 text-sm">
								<Link
									className="line-clamp-2 hover:underline hover:underline-offset-4"
									href={`/book/${bookId}`}
								>
									{title}
								</Link>
							</div>
						</div>
					);
				})}
			</EmblaCarousel>
		</>
	);
}
