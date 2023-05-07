import { BookCard } from "@/components/BookCard";
import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";
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
    <div className="results">
      {searchReseult?.map(({ title, bookId, imageUrl }) => {
        return (
          <div key={title} className="">
            <BookCard {...{ title, bookId, imageUrl }} />
          </div>
        );
      })}
    </div>
  );
}
