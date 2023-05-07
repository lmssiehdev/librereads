import RawBook from "@/types/rawBook";
import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";
import BookInfo from "./getBook";
import { Wrapper } from "./similarBooks";

const o: RawBook = {
  bookId: 100000,
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

async function fetchBookDetails(id = 7235533) {
  if (id === 7235533) return o;

  const res = await axiosInstance(`/book/show/${id}`);
  const $ = cheerio.load(res.data);
  const rawData = $("script#__NEXT_DATA__").text();

  const parsedRawData: any = JSON.parse(rawData);
  const cleanedUpData = cleanUpTitle(parsedRawData);

  return {
    ...cleanedUpData,
    bookId: id,
  };
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
      <Wrapper id={bookInfo.similarBooksUrl} />
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
    // change me
    bookId: 1000,
  };
}
