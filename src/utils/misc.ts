export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Changes the size of a Goodreads image URL by modifying the image size parameter.
 * @param imageUrl - The original Goodreads image URL.
 * @param size - The desired size for the image.
 * @returns The modified Goodreads image URL with the specified size.
 */
export function changeGoodreadsImageSize(imageUrl: string, size: number) {
  const regex = /(_S)([XY]\d+)(_\.)/;
  return imageUrl.replace(regex, `$1X${size}$3`);
}

/**
 * Extracts the book ID from a Goodreads book URL.
 * @param url - The Goodreads book URL.
 * @returns The book ID extracted from the URL.
 *
 * Regular expression tests: [Regex Tests](https://regexr.com/7f893)
 */
export function getIdFromUrl(url: string): string {
  const regex = /(\d+)/;
  const match = url.match(regex);

  return match ? match[0] : "";
}
