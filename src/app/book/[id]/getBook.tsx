import RawBook from "@/types/rawBook";
import Rating from "./Components/Rating";
import Select from "./Components/StateSelect";
import Description from "./Components/Description";

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
  } = info;

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
              <a className="text-purple-600" key={name} href={webUrl}>
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
