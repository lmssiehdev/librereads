import RawBook from "@/types/rawBook";
import * as cheerio from "cheerio";
import { getErrorMessage, getIdFromUrl } from "@/utils/misc";

export async function fetchBookDetails(
  id = 7235533
): Promise<Partial<RawBook> | void> {
  return null
  try {
    console.log("fetching book with the id", id);
    const res = await fetch(`https://goodreads.com/book/show/${id}`, {
      method: "GET",
      headers: new Headers({
        "User-Agent": process.env.AXIOS_USERAGENT as string,
      }),
      next: { tags: ["book"] },
    });

    const htmlString = await res.text();
    const $ = cheerio.load(htmlString);

    const r: Partial<RawBook> = {
      title: $("[data-testid=bookTitle]").text(),
      imageUrl: $(".BookCover__image img").attr("src") as string,
      authors: Array.from($(".ContributorLinksList .ContributorLink")).map(
        (ele) => {
          const authorEle = $(ele);
          return {
            name: authorEle.find("[data-testid=name]").text(),
            id: getIdFromUrl(authorEle.attr("href") as string),
          };
        }
      ),
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
      ratingsCountDist: Array.from(
        $(".ReviewsSectionStatistics__histogram .RatingsHistogram__labelTotal")
      )
        .map((item) => $(item).text())
        .reverse()
        .map((t) => {
          const [reviews, percentage] = t.split(" ");
          return { reviews, percentage };
        }),
      bookId: id,
    };
    if (r.title !== "") {
      const rawData = $("script#__NEXT_DATA__").text();
      const parsedRawData: any = JSON.parse(rawData);
      const nextState = parsedRawData.props.pageProps.apolloState;
      const key = Object.keys(nextState).filter((key) => key.includes("Work"));

      const similarBooksUrl = nextState[key[0]]?.legacyId;

      return { ...r, similarBooksUrl } as RawBook;
    }
    return await fetchBookDetails(id);
  } catch (e) {
    console.log(getErrorMessage);
  }
}
