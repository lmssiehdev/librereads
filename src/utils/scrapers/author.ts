import { JSDOM } from "jsdom";
import {
  AUTHOR_IMAGE_FALLBACK,
  changeGoodreadsImageSize,
  extractIdFromUrl,
} from "../goodreads";
import { extractGoodreadsSeriesId } from "../goodreads/index";

export async function fetchAuthorDetails(id: string) {
  try {
    const res = await fetch(`https://goodreads.com/author/show/${id}`, {
      method: "GET",
      headers: new Headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      }),
    });
    const htmlString = await res.text();
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    const series = Array.from(
      document.querySelectorAll(".bookRow.seriesBookRow")
    )?.map((elment) => {
      const rating = elment.querySelector(".minirating")?.textContent;
      const titleEle = elment.querySelector(".bookTitle");
      const authorEle = elment.querySelector(".authorName");
      const numberOfBooksInSeries = elment
        .querySelector(".bookMeta")
        ?.textContent?.trim();

      const covers = Array.from(
        elment.querySelectorAll(".seriesCovers img")
      ).map((ele) => {
        return {
          title: ele.getAttribute("alt"),
          url: ele.getAttribute("src"),
        };
      });

      return {
        title: titleEle?.textContent || "",
        webUrl: titleEle?.getAttribute("href") || "",
        seriesId: extractGoodreadsSeriesId(
          titleEle?.getAttribute("href") || ""
        ),
        author: {
          name: authorEle?.textContent || "",
          url: authorEle?.getAttribute("href") || "",
        },
        rating,
        numberOfBooksInSeries,
        covers,
      };
    });

    const authorData = {
      image:
        (document
          .querySelector(".authorLeftContainer > a img")
          ?.getAttribute("src") as string) || AUTHOR_IMAGE_FALLBACK,
      name: document.querySelector("h1.authorName span")?.textContent || "",
      description: document.querySelector(
        ".aboutAuthorInfo [id^=freeTextContainerauthor]"
      )?.innerHTML as string,
    };

    const books = Array.from(
      document.querySelectorAll("table.stacked tbody tr")
    ).map((node) => {
      return {
        bookTitle: node.querySelector(".bookTitle span")?.textContent || "",
        bookId: extractIdFromUrl(
          node.querySelector(".bookTitle")?.getAttribute("href") || ""
        ),
        bookCover: changeGoodreadsImageSize(
          node.querySelector("img.bookCover")?.getAttribute("src") as string,
          200
        ),
        bookRating: node.querySelector(".minirating")?.textContent || "",
      } as const;
    });

    return {
      seo: {
        title: document.title,
        description: `${`${authorData.name} is the author of ${books
          .map(({ bookTitle, bookRating }) => `${bookTitle} (${bookRating})`)
          .join(", ")}`
          .substring(0, 153)
          .trim()}...`,
      },
      author: authorData,
      series,
      books,
    };
  } catch (e) {
    console.log(e);
  }
}
