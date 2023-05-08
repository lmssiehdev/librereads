import Image from "next/image";
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
        <Image
          className="inline-block h-full w-full object-fill"
          src={imageUrl}
          alt={`${title} book cover`}
          height={260}
          width={200}
        />
      </div>
      <Link className="text-center text-xs" href={`/book/${bookId}`}>
        {title}
      </Link>
    </>
  );
}
