import RawBook from "@/types/rawBook";
import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";
import Link from "next/link";
import { Fragment } from "react";

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

async function fetch(searchQuery = "") {
  try {
    const res = await axiosInstance(`/search?search?page=1&q=${searchQuery}`);
    const $ = cheerio.load(res.data);
    const rawData = $("body").html();

    const dom = new JSDOM(rawData);
    const searchResult = [
      ...dom.window.document.querySelectorAll("tbody tr"),
    ].map((book) => {
      return {
        title: book.querySelector(".bookTitle span").textContent,
        authorName: book.querySelector(".authorName span").textContent,
        imageUrl: book
          .querySelector(".bookCover")
          .src.replace(/\._.*?\.jpg/g, ".jpg"),
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
  searchParams,
}: {
  params: {
    id: number;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = (searchParams.q as string) ?? "";

  if (searchQuery === "") return <div>Please search</div>;

  const searchReseult = await fetch(searchQuery);

  return (
    <div>
      {JSON.stringify(searchParams)}
      <div className="grid gap-3 md:grid-cols-[repeat(auto-fill,185px)] grid-cols-[repeat(auto-fill,100px)]">
        {searchReseult?.map(({ title, bookId, imageUrl }) => {
          return (
            <div key={title} className="">
              <div className="rounded overflow-hidden md:h-[260px] h-[160px]">
                <img
                  className="inline-block h-full w-full object-fill"
                  src={imageUrl}
                  alt={`${title} book cover`}
                />
              </div>
              <Link className="text-center text-sm" href={`/book/${bookId}`}>
                {title}
              </Link>
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
