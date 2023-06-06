import { rawList } from "@/types/rawList";
import {
  changeGoodreadsImageSize,
  getErrorMessage,
  getIdFromUrl,
} from "@/utils/misc";
import * as cheerio from "cheerio";

export async function fetchListDetails(id: string) {
  try {
    const res = await fetch(`https://goodreads.com/list/show/${id}?page=1`, {
      method: "GET",
      headers: new Headers({
        "User-Agent": process.env.AXIOS_USERAGENT as string,
      }),
      next: { tags: ["list"] },
    });

    const htmlString = await res.text();
    const $ = cheerio.load(htmlString);

    const r: rawList = {
      title: $("h1.gr-h1").text(),
      books: Array.from($("#all_votes table tr")).map((element) => {
        const $listItem = $(element);

        return {
          bookCover: changeGoodreadsImageSize(
            $listItem.find("img.bookCover").attr("src") as string,
            70
          ),
          bookTitle: $listItem.find("a.bookTitle span").text(),
          bookAuthor: $listItem.find("a.authorName span").text(),
          bookRating: $listItem.find(".minirating").text(),
          bookId: getIdFromUrl(
            $listItem.find("a.bookTitle").attr("href") as string
          ),
        };
      }),
    };
    if (r.title !== "") return r;
    fetchListDetails(id);
  } catch (e) {
    console.log(getErrorMessage);
  }
}
