import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";
import Link from "next/link";

interface SimilarBook {
  book: {
    imageUrl: string;
    bookId: number;
    title: string;
    avgRating: 4.55;
  };
}

interface JSONSimilarBooks {
  similarBooks: Array<SimilarBook>;
}

async function fetch(id = 2116675) {
  try {
    const res = await axiosInstance(`/book/similar/${id}`);
    const $ = cheerio.load(res.data);
    const rawData = $("[data-react-props]:not(:first-child)").data(
      "reactProps"
    ) as JSONSimilarBooks;

    const formatedBooks = Object.values(rawData.similarBooks).map(
      ({ book }) => {
        const { imageUrl, bookId, avgRating, title } = book;

        return {
          imageUrl,
          bookId,
          avgRating,
          title,
        };
      }
    );

    return formatedBooks;
  } catch (err) {
    console.error(err);
  }
}

interface Props {
  id: number;
}

export default async function SimilarBooks({ id }: Props) {
  const res = await fetch(id);

  if (!res) return <div>yikes! there was an error, please try again.</div>;

  return (
    <div className="grid grid-cols-4 gap-3">
      {res.map(({ bookId, title, imageUrl }) => {
        return (
          <div key={bookId} className="mx-auto">
            <div className="h-[180px] w-[120px] mx-auto">
              <img
                className="inline-block h-full w-full"
                src={imageUrl}
                alt={`${title} book cover`}
              />
            </div>
            ResponsiveImage src AverageRating__ratingValue span textContent
            BookCard__authorName textContent BookCard__title textContent
            <Link href={`/book/${bookId}`}>
              <span className="text-sm text-center"> {title} </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
