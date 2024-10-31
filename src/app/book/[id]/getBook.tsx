import {
  type GetBookByLegacyIdSchema,
  getBookByLegacyId,
} from "@/query/getBookByLegacyId";
import type RawBook from "@/types/rawBook";
import { client } from "@/utils/apollo-client";
import Image from "next/image";
import Link from "next/link";
import Description from "./Components/Description";
import Rating from "./Components/Rating";
import Select from "./Components/StateSelect";

function calculatePercentages(arr: number[]) {
  const totalSum = arr.reduce((sum, num) => sum + num, 0);
  const percentages = arr.map((num) => ({
    reviews: num,
    percentage: (Math.round((num / totalSum) * 10000) / 100).toFixed(),
  }));
  return percentages;
}

export default async function BookInfo({
  data,
}: {
  data: GetBookByLegacyIdSchema["getBookByLegacyId"];
}) {
  const bookInfo: RawBook = {
    title: data.title,
    bookId: data.legacyId,
    description: data.description,
    imageUrl: data.imageUrl,
    averageRating: data.work.stats.averageRating,
    authors: [
      {
        // TODO: get actual author id
        id: data.primaryContributorEdge.node.legacyId.toString(),
        name: data.primaryContributorEdge.node.name,
      },
    ],
    genres: data.bookGenres.map(({ genre: { name, webUrl } }) => ({
      name,
      webUrl,
    })),
    ratingsCountDist: calculatePercentages(data.work.stats.ratingsCountDist),
  };

  const {
    imageUrl,
    title,
    description,
    averageRating,
    authors,
    genres,
    ratingsCountDist,
  } = bookInfo;
  return (
    <div>
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 md:gap-8">
        <div className="max-w-fit sm:w-auto">
          <div className="h-[260px] w-[180px] overflow-hidden rounded object-fill">
            <img
              className="h-full w-full inline-block "
              src={imageUrl}
              alt={`${title} cover image`}
              loading="lazy"
            />
          </div>
          {/* <Select info={info} /> */}
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{title}</h1>
          <div className="flex gap-1">
            by:{" "}
            {authors.map(({ id, name }, index) => {
              return (
                <>
                  <Link
                    key={id}
                    href={`/author/${id}`}
                    className="inline opacity-60"
                  >
                    <span>{name}</span>
                    {index + 1 < authors.length && ","}
                  </Link>
                </>
              );
            })}
          </div>

          <div className="py-2">
            {/* <Rating rating={averageRating} info={info} /> */}
          </div>
          <div className="overflow-hidden">
            <Description description={description} />
          </div>
          <div className="flex gap-x-3 flex-wrap">
            <span>Tags:</span>
            {genres.map(({ webUrl, name }) => (
              <span className="text-purple-600" key={name}>
                {name}
              </span>
            ))}
          </div>

          <div className="py-10">
            <h3 className="text-xl pb-4"> Community Reviews: </h3>
            <div className="flex flex-col gap-y-4">
              {ratingsCountDist
                .reverse()
                .map(({ percentage, reviews }, index) => {
                  const percentageNumber = percentage
                    .split("")
                    .filter((t) => Number(t) === 0 || Number(t))
                    .join("");

                  return (
                    <div
                      key={percentage}
                      className="grid grid-cols-[2.5rem_auto_5.5rem] md:grid-cols-[4rem_auto_7rem]  items-center text-[#655d52] gap-4"
                    >
                      <span className="md:text-sm text-xs text-left">
                        {ratingsCountDist.length - index} star
                      </span>
                      <div className="flex items-center h-4 w-full rounded bg-gray-200">
                        <span
                          style={{
                            width: `${percentageNumber}%`,
                          }}
                          className="bg-yellow-500 h-full rounded"
                        ></span>
                      </div>
                      <span className="md:text-sm text-xs text-right">
                        {reviews} {`(${percentage}%)`}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
