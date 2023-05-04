import RawBook from "@/types/rawBook";
import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";
import Link from "next/link";

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

function extractBookIdFromUrl(url: string): string {
  const start = url.indexOf("/book/show/") + 11; // add 11 to get to end of '/book/show/'
  const end = url.indexOf(".", start); // find the next '.' starting from the end of '/book/show/'
  return url.slice(start, end);
}

async function fetch(id = 7235533) {
  try {
    const res = await axiosInstance(`/search?search?page=1&q=ayn+rand`);
    const $ = cheerio.load(res.data);
    const rawData = $("body").html();

    const dom = new JSDOM(rawData);
    const searchResult = [
      ...dom.window.document.querySelectorAll("tbody tr"),
    ].map((book) => {
      return {
        title: book.querySelector(".bookTitle span").textContent,
        authorName: book.querySelector(".authorName span").textContent,
        imageUrl: book.querySelector(".bookCover").src,
        bookId: book
          .querySelector(".bookTitle")
          .href.match(/\/book\/show\/(\d+)/)[1],
      };
    });
    return searchResult;
  } catch (err) {
    console.error(err);
  }
}

export default async function Book({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const searchReseult = await fetch();

  return (
    <div>
      <div>
        {searchReseult?.map(({ title, bookId }) => {
          return (
            <div key={title}>
              <Link href={`/book/${bookId}`}>{title}</Link>
            </div>
          );
        })}
      </div>
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
}): RawBook | null {
  const data = rawProps.props.pageProps.apolloState;

  // TODO: loop only once.
  const book = Object.keys(data).find((item) => item.startsWith("Book:"));
  const contributor = Object.keys(data).find((item) =>
    item.startsWith("Contributor:")
  );
  const work = Object.keys(data).find((item) => item.startsWith("Work:"));

  if (!book || !contributor || !work) return null;

  const { name: authorName } = data[contributor];
  const { title, imageUrl, bookGenres, description } = data[book];
  const {
    stats: { averageRating, ratingsCount, textReviewsCount },
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
  };
}
