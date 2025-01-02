/**
 * Changes the size of a Goodreads image URL by modifying the image size parameter.
 */
export function changeGoodreadsImageSize(imageUrl: string, size: number) {
  const regex = /(_S)([XY]\d+)(_\.)/;
  return imageUrl.replace(regex, `$1X${size}$3`);
}

export function extractIdFromUrl(url: string): number | null {
  const match = url.match(/\/(book|author)\/show\/(\d+)/);
  return match ? Number.parseInt(match[2], 10) : null;
}

export function extractSeriesId(url: string): string | null {
  const match = url.match(/(\d+)/);
  return match ? match[1] : null;
}
