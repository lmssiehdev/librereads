import RawBook from "@/types/rawBook";
import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";
import BookInfo from "./getBook";
import SimilarBooks from "./similarBooks";

async function fetchBookDetails(id = 7235533) {
  const res = await axiosInstance(`/book/show/${id}`);
  const $ = cheerio.load(res.data);
  const rawData = $("script#__NEXT_DATA__").text();

  const parsedRawData: any = JSON.parse(rawData);
  const cleanedUpData = cleanUpTitle(parsedRawData);

  return cleanedUpData;
}

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
      {/* @ts-expect-error Async Server Component */}
      <SimilarBooks url={bookInfo.similarBooksUrl} />
    </div>
  );
}

function cleanUpTitle(rawProps: {
  props: {
    pageProps: {
      apolloState: {
        [key: string]: any;
      };
    };
  };
}): RawBook {
  const data = rawProps.props.pageProps.apolloState;

  // TODO: loop only once.
  const book = Object.keys(data).find((item) =>
    item.startsWith("Book:")
  ) as string;
  const contributor = Object.keys(data).find((item) =>
    item.startsWith("Contributor:")
  ) as string;
  const work = Object.keys(data).find((item) =>
    item.startsWith("Work:")
  ) as string;

  const { name: authorName } = data[contributor];
  const { title, imageUrl, bookGenres, description } = data[book];
  const {
    stats: { averageRating, ratingsCount, textReviewsCount },
    legacyId,
  } = data[work];

  const genres = bookGenres.map(
    ({ genre }: { genre: { name: string; webUrl: string } }) => {
      const { name, webUrl } = genre;

      return {
        name,
        webUrl,
      };
    }
  );

  return {
    title,
    imageUrl,
    description,
    ...{ averageRating, ratingsCount, textReviewsCount },
    genres,
    authorName,
    similarBooksUrl: legacyId || 8134945,
  };
}
