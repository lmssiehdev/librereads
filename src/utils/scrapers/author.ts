import { RawAuthor } from "@/types/rawAuthor";
import * as cheerio from "cheerio";
import { getErrorMessage } from "@/utils/misc";

export async function fetchAuthorDetails(id = "432.Ayn_Rand") {
  try {
    const res = await fetch(`https://goodreads.com/author/show/${id}`, {
      method: "GET",
      headers: new Headers({
        "User-Agent": process.env.AXIOS_USERAGENT as string,
      }),
      next: { tags: ["book"] },
    });

    const htmlString = await res.text();
    const $ = cheerio.load(htmlString);

    const r: Partial<RawAuthor> = {
      author: {
        image: $(" .authorLeftContainer > a img").attr("src") as string,
        name: $("h1.authorName span").text(),
      },
      books: Array.from($("table.stacked tbody tr")).map((node) => {
        const ele = $(node);
        return {
          bookTitle: ele.find(".bookTitle span").text(),
          bookCover: ele.find("img.bookCover").attr("src") as string,
          bookRating: ele.find(".minirating").text(),
        } as const;
      }),
    };

    if (r.author.name !== "") return r;
    fetchAuthorDetails(id);
  } catch (e) {
    console.log(getErrorMessage);
  }
}
