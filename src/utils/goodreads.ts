export const AUTHOR_IMAGE_FALLBACK =
  "https://s.gr-assets.com/assets/nophoto/user/u_200x266-e183445fd1a1b5cc7075bb1cf7043306.png";

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

export function extractIdFromUrl(url: string): number | null {
  const match = url.match(/\/(book|author)\/show\/(\d+)/);
  return match ? Number.parseInt(match[2], 10) : null;
}

export function extractSeriesId(url: string): string | null {
  const match = url.match(/(\d+)/);
  return match ? match[1] : null;
}
