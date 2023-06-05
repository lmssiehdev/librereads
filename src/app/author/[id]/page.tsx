import Description from "@/app/book/[id]/Components/Description";
import { fetchAuthorDetails } from "@/utils/scrapers/author";

export default async function getAuthor({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const result = await fetchAuthorDetails(params.id);

  if (!result) return <div>{"author doesn't exist"}</div>;

  const { books, author } = result;
  return (
    <>
      <div className="my-10">
        <div className="flex flex-col md:flex-row gap-10 my-10">
          <div>
            <img src={author.image} alt={`${author.name} profile picture`} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl mb-5">{author.name}</h1>
            <Description description={author.description} />
          </div>
        </div>
        <div>
          <h2 className="text-xl my-8">{`${author.name}'s books`}</h2>

          <div className="flex flex-col gap-2">
            {books?.map(({ bookCover, bookTitle, bookRating }) => {
              return (
                <div key={bookCover} className="flex gap-3">
                  <div className="h-[150px] max-w-[100px] w-full flex-1">
                    <img
                      className="w-full h-full inline-block object-fill"
                      src={bookCover}
                      alt={`${bookTitle} cover image`}
                    />
                  </div>
                  <div className="flex-1">
                    <div>{bookTitle}</div>
                    <span className="text-xs text-slate-500">
                      {" "}
                      {bookRating}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
