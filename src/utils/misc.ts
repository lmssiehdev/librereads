import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCache(headers: (HeadersInit | undefined) & Headers) {
  headers.set("Cache-Control", "s-maxage=86400, stale-while-revalidate");
}
