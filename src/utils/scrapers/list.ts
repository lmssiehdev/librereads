import { JSDOM } from "jsdom";
import { extractIdFromUrl } from "../goodreads";

function nextAndPreviousUrls(document: Document) {
  return {
    hasNextPage:
      document.querySelector(".next_page") != null &&
      !document.querySelector(".next_page")?.classList.contains("disabled"),
    hasPreviousPage:
      document.querySelector(".previous_page") != null &&
      !document.querySelector(".previous_page")?.classList.contains("disabled"),
  };
}

export async function fetchListDetails(id: string, page: number) {
  try {
    const res = await fetch(
      `https://goodreads.com/list/show/${id}?page=${page}`,
      {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }),
      }
    );
    const htmlString = await res.text();
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    const tags = Array.from(document.querySelectorAll(".actionLinkLite")).map(
      (element) => ({
        name: element.textContent || "",
        webUrl: element.getAttribute("href") || "",
      })
    );
    const booksInList = Array.from(
      document.querySelectorAll(".tableList tr")
    ).map((element) => {
      const bookTitleEle = element.querySelector(".bookTitle");
      const authorEle = element.querySelector(".authorName");

      return {
        ranking: element.querySelector(".number")?.textContent || "",
        image: element.querySelector(".bookCover")?.getAttribute("src") || "",
        title: bookTitleEle?.textContent?.trim() || "",
        webUrl: bookTitleEle?.getAttribute("href") || "",
        author: {
          name: authorEle?.textContent || "",
          webUrl:
            authorEle
              ?.getAttribute("href")
              ?.replace("https://www.goodreads.com", "") || "",
          id: extractIdFromUrl(authorEle?.getAttribute("href") || "") || "",
        },
        info:
          element.querySelector(".smallText.uitext")?.textContent?.trim() || "",
      };
    });

    return {
      seo: {
        title: document.title,
        description: `A list of ${document.title}: ${booksInList
          .slice(0, 4)
          .map(({ title, author: { name } }) => `${title} by ${name}`)
          .join(", ")
          .substring(0, 153)
          .trim()}...`,
      },
      title: document.querySelector(".gr-h1")?.textContent?.trim() || "",
      description:
        document
          .querySelector(".u-paddingBottomMedium.mediumText")
          ?.textContent?.trim()
          .replace("flag", "") || "",
      rows: booksInList,
      likes: document.querySelector(".likesCount")?.textContent || "",
      tags,
      ...nextAndPreviousUrls(document),
    };
  } catch (e) {
    console.log(e);
  }
}
