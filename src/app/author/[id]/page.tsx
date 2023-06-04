import Description from "@/app/book/[id]/Components/Description";
import { fetchAuthorDetails } from "@/utils/scrapers/author";

export default async function getAuthor({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const result = await fetchAuthorDetails();

  if (!result) return <div>{"author doesn't exist"}</div>;

  const { books, author } = result;
  return (
    <>
      <div className="my-10">
        <div className="flex gap-10 my-10">
          <div>
            <img src={author.image} alt={`${author.name} profile picture`} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl mb-5">{author.name}</h1>
            <Description description={author.description} />
          </div>
        </div>
        {books?.map(({ bookCover, bookTitle, bookRating }) => {
          return (
            <div key={bookCover} className="flex gap-3">
              <div>
                <img src={bookCover} alt={`${bookTitle} cover image`} />
              </div>
              <div>
                <div>{bookTitle}</div>
                <span className="text-xs text-slate-500"> {bookRating}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
