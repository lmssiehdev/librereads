import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";
import Link from "next/link";
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

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

async function fetch(id: number) {
  return null;
  try {
    const res = await axiosInstance(`/book/similar/${8134945}`);
    const $ = cheerio.load(res.data);
    const rawHTML = $("body").html();

    const dom = new JSDOM(rawHTML);
    const rawData = dom.window.document
      .querySelector("[data-react-props]:not(:first-child)")
      .getAttribute("data-react-props");

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
    <div>
      <h3 className="py-2">Similar Books</h3>
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
              <Link href={`/book/${bookId}`}>
                <span className="text-sm text-center"> {title} </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export function Wrapper({ id }: { id: number }) {
//   return <UseClient>{/* <SimilarBooks url={id} /> */}</UseClient>;
// }
