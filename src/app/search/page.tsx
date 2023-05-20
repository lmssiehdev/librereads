import { BookCard } from "@/components/BookCard";
import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";

async function fetchSearchResult(searchQuery = "") {
  try {
    const res = await fetch(
      `https://goodreads.com/search?search?page=1&q=${searchQuery}`,
      {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }),
      }
    );
    const html = await res.text();
    const $ = cheerio.load(html);
    const rawData = $("body").html();

    const searchResults: Array<{
      title: string;
      authorName: string;
      imageUrl: string;
      bookId: number;
    }> = [];

    $("tbody tr").each((_: number, element) => {
      const $book = $(element);

      const title = $book.find(".bookTitle span").text();
      const authorName = $book.find(".authorName span").text();
      const imageUrl = $book
        .find(".bookCover")
        .attr("src")
        ?.replace(/\._.*?\.jpg/g, ".jpg");
      const bookIdMatch = $book
        .find(".bookTitle")
        .attr("href")
        ?.match(/\/book\/show\/(\d+)/);
      const bookId = bookIdMatch ? bookIdMatch[1] : undefined;

      searchResults.push({
        title,
        authorName,
        imageUrl: imageUrl as string,
        bookId: Number(bookId),
      });
    });

    return searchResults;
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

  const searchReseult = await fetchSearchResult(searchQuery);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(145px,180px))] justify-center md:gap-x-1 md:gap-y-3 gap-x-3 gap-y-6">
      {searchReseult?.map(({ title, bookId, imageUrl }) => {
        return (
          <div key={title}>
            <BookCard {...{ title, bookId, imageUrl }} />
          </div>
        );
      })}
    </div>
  );
}
