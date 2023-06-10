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

async function fetchSimilarBooks(id: number = 8134945) {
  try {
    const response = await fetch(`https://goodreads.com/book/similar/${id}`);
    const data = await response.text();
    const $ = cheerio.load(data);
    const rawHTML = $("body").html();

    const rawData = $("[data-react-props]:not(:first-child)").attr(
      "data-react-props"
    ) as string;

    const { similarBooks } = JSON.parse(rawData) as JSONSimilarBooks;

    const formatedBooks = Object.values(similarBooks).map(({ book }) => {
      const { imageUrl, bookId, avgRating, title } = book;

      return {
        imageUrl,
        bookId,
        avgRating,
        title,
      };
    });

    console.log(formatedBooks);
    return formatedBooks;
  } catch (err) {
    console.error(err);
  }
}

interface Props {
  id: number;
}

export default async function SimilarBooks({ id }: Props) {
  const res = await fetchSimilarBooks(id);

  if (!res) return <div>yikes! there was an error, please try again.</div>;

  return (
    <>
      {res.map(({ bookId, title, imageUrl }) => {
        return (
          <div key={bookId} className="mx-auto">
            <div className="h-[180px] w-[120px] mx-auto">
              <picture>
                <img
                  className="inline-block h-full w-full"
                  src={imageUrl}
                  alt={`${title} book cover`}
                  loading="lazy"
                />
              </picture>
            </div>
            <Link
              className="my-2 text-sm text-center line-clamp-2"
              href={`/book/${bookId}`}
            >
              {title}
            </Link>
          </div>
        );
      })}
    </>
  );
}

// export function Wrapper({ id }: { id: number }) {
//   return <UseClient>{/* <SimilarBooks url={id} /> */}</UseClient>;
// }
