import RawBook from "@/types/rawBook";
import Rating from "./Components/Rating";
import Select from "./Components/StateSelect";
import Description from "./Components/Description";

function calculatePercentages(arr: number[]) {
  const totalSum = arr.reduce((sum, num) => sum + num, 0);
  const percentages = arr.map(
    (num) => Math.round((num / totalSum) * 10000) / 100
  );
  return percentages;
}

interface Props {
  info: RawBook;
}

export default async function BookInfo({ info }: Props) {
  const {
    imageUrl,
    title,
    description,
    genres,
    averageRating,
    authorName,
    similarBooksUrl,
    ratingsCountDist,
  } = info;

  const percentages = calculatePercentages([...ratingsCountDist].reverse());

  return (
    <div>
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 md:gap-8">
        <div className="max-w-fit sm:w-auto">
          <div className="h-[260px] w-[180px] overflow-hidden rounded object-fill">
            <img
              className="h-full w-full inline-block "
              src={imageUrl}
              alt={`${title} cover image`}
            />
          </div>
          <Select info={info} />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="opacity-60">by: {authorName} </p>
          <div className="py-2">
            <Rating rating={averageRating} info={info} />
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
              {ratingsCountDist.reverse().map((rating, index) => {
                const percentage = percentages[index];
                return (
                  <div
                    key={rating}
                    className="grid grid-cols-[2.5rem_auto_5.5rem] md:grid-cols-[4rem_auto_7rem]  items-center text-[#655d52] gap-4"
                  >
                    <span className="md:text-sm text-xs text-left">
                      {ratingsCountDist.length - index} star
                    </span>
                    <div className="flex items-center h-4 w-full rounded bg-gray-200">
                      <span
                        style={{
                          width: `${percentage}%`,
                        }}
                        className="bg-yellow-500 h-full rounded"
                      ></span>
                    </div>
                    <span className="md:text-sm text-xs text-right">
                      {rating.toLocaleString()} ({percentage}%)
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
