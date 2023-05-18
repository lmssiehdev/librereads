import RawBook from "@/types/rawBook";
import * as cheerio from "cheerio";
import { getErrorMessage } from "@/utils/misc";

export async function fetchBookDetails(
  id = 7235533
): Promise<Partial<RawBook> | void> {
  // if (id === 7235533) return o;
  try {
    const res = await fetch(`https://goodreads.com/book/show/${id}`, {
      method: "GET",
      headers: new Headers({
        "User-Agent": process.env.AXIOS_USERAGENT as string,
      }),
    });

    const htmlString = await res.text();
    const $ = cheerio.load(htmlString);
    // const rawData = $("script#__NEXT_DATA__").text();
    // const parsedRawData: any = JSON.parse(rawData);

    const r: Partial<RawBook> = {
      title: $("[data-testid=bookTitle]").text(),
      imageUrl: $(".BookCover__image img").attr("src") as string,
      authorName: $(
        ".ContributorLinksList .ContributorLink [data-testid=name]"
      ).text(),
      averageRating: Number(
        $(".BookPageMetadataSection .RatingStatistics__rating").text()
      ),
      bookDetails: {
        pagesFormat: $(
          ".BookPageMetadataSection .BookDetails .FeaturedDetails [data-testid=pagesFormat]"
        ).text(),
      },
      genres: Array.from(
        $(
          ".BookPageMetadataSection [data-testid=genresList] .BookPageMetadataSection__genreButton .Button__labelItem"
        )
      ).map((item) => ({
        name: $(item).text(),
        webUrl: "",
      })),
      description: $("[data-testid=description] .Formatted").html() as string,
      ratingsCountDist: [
        "443 (54%)",
        "235 (29%)",
        "106 (13%)",
        "20 (2%)",
        "2 (<1%)",
      ]
        .reverse()
        .map((t) => t.split(" ")[1].split("").filter(Number).join(""))
        .map((t) => Number(t)),
      bookId: id,
    };
    if (r.title !== "") return r;
    fetchBookDetails(id);
  } catch (e) {
    console.log(getErrorMessage);
  }
}
