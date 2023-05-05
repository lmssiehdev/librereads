import RawBook from "@/types/rawBook";

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
    </div>
  );
}
