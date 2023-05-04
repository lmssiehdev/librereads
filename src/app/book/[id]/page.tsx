import RawBook from "@/types/rawBook";
import { axiosInstance } from "@/utils/axiosInstance";
import * as cheerio from "cheerio";

async function fetch(id = 7235533) {
  const res = await axiosInstance(`/book/show/${id}`);
  const $ = cheerio.load(res.data);
  const rawData = $("script#__NEXT_DATA__").text();

  const parsedRawData: any = JSON.parse(rawData);
  const cleanedUpData = cleanUpTitle(parsedRawData);

  return cleanedUpData as RawBook;
}

export default async function Book({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { imageUrl, title, description, genres, averageRating, authorName } =
    await fetch(params.id);

  return (
    <div>
      <div className="flex gap-3">
        <div className="h-[260px] w-[180px] overflow-hidden rounded object-fill">
          <img
            className="h-full w-full inline-block"
            src={imageUrl}
            alt={`${title} cover image`}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{title}</h1>
          <h3>rating: {averageRating}</h3>
          <p>author: {authorName} </p>
          <p>{description.substring(0, 300)}</p>
          <div className="flex gap-x-3 flex-wrap">
            {genres.map(({ webUrl, name }) => (
              <a className="text-purple-600" key={name} href={webUrl}>
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* <SimilarBooks /> */}
      {/* <pre>{JSON.stringify(cleanedUpData, null, 2)}</pre> */}
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
}): RawBook {
  const data = rawProps.props.pageProps.apolloState;

  // TODO: loop only once.
  const book = Object.keys(data).find((item) =>
    item.startsWith("Book:")
  ) as string;
  const contributor = Object.keys(data).find((item) =>
    item.startsWith("Contributor:")
  ) as string;
  const work = Object.keys(data).find((item) =>
    item.startsWith("Work:")
  ) as string;

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
