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

export function extractIdFromUrl(url: string): number | null {
  const match = url.match(/\/(book|author)\/show\/(\d+)/);
  return match ? parseInt(match[2], 10) : null;
}
