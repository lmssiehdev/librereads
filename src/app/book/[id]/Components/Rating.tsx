"use client";

import { useBookStore } from "@/store/books";
import type RawBook from "@/types/rawBook";
import { StarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function Rating({
  rating,
  info,
}: {
  rating: number;
  info: RawBook;
}) {
  return (
    <div className="flex">
      {Array(Math.round(5))
        .fill(true)
        .map((_, index) => {
          return (
            <span key={index} className="">
              <StarIcon
                className={clsx("h-6 w-6", {
                  "text-yellow-500": index + 1 < rating,
                  "text-black/10": index + 1 > rating,
                })}
              />
            </span>
          );
        })}
    </div>
  );
}
