/**
 * Extracts series ID from Goodreads URL
 * @param {string} url - Goodreads series URL
 * @returns {string} Series ID
 * @example
 * extractGoodreadsSeriesId("goodreads.com/series/123456-book-name") // "123456"
 */
export function extractGoodreadsSeriesId(url: string): string {
  const match = url.match(/\/series\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? "";
}

/**
 * Changes the size of a Goodreads image URL by modifying the image size parameter.
 */
export function changeGoodreadsImageSize(imageUrl: string, size: number) {
  // Handle URLs with existing _SX or _SY parameter
  const regexSX = /(_SX\d+_\.)/;
  const regexSY = /(_SY\d+_\.)/;

  if (regexSX.test(imageUrl)) {
    return imageUrl.replace(/_SX\d+_\./, `_SX${size}_.`);
  }

  if (regexSY.test(imageUrl)) {
    return imageUrl.replace(/_SY\d+_\./, `_SX${size}_.`);
  }

  // If no size parameter exists, add _SX
  return imageUrl.replace(/\.jpg$/, `._SX${size}_.jpg`);
}
