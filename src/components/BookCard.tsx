import Link from "next/link";

export function BookCard({
  imageUrl,
  title,
  bookId,
}: {
  imageUrl: string;
  title: string;
  bookId: number;
}) {
  return (
    <>
      <div className="rounded overflow-hidden h-[260px]">
        <img
          className="inline-block h-full w-full object-fill"
          src={imageUrl}
          alt={`${title} book cover`}
        />
      </div>
      <Link className="text-center text-xs" href={`/book/${bookId}`}>
        {title}
      </Link>
    </>
  );
}
