import { fetchBookDetails } from "@/utils/scrapers/book";
import { Suspense } from "react";
import { EmblaCarousel } from "./EmblaCarousel";
import BookInfo from "./getBook";
import SimilarBooks from "./similarBooks";

export default async function BookPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const bookInfo = await fetchBookDetails(params.id);

  return (
    <div>
      {/* @ts-expect-error Async Server Component */}
      <BookInfo info={bookInfo} />

      <EmblaCarousel>
        <Suspense fallback={<div>loading...</div>}>
          {/* @ts-expect-error Server Component */}
          <SimilarBooks id={bookInfo?.similarBooksUrl} />
        </Suspense>
      </EmblaCarousel>
    </div>
  );
}
