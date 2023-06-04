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

  const { books } = result;
  return (
    <>
      {JSON.stringify(result)}
      <div>
        {books?.map(({ bookCover, bookTitle }) => {
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
