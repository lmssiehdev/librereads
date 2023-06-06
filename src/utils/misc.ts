export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function changeGoodreadsImageSize(imageUrl: string, size: number) {
  const regex = /(_S)([XY]\d+)(_\.)/;
  return imageUrl.replace(regex, `$1X${size}$3`);
}

export function getIdFromUrl(url: string) {
  const cleanUrl = url.split("?")[0];

  return cleanUrl.substring(cleanUrl.lastIndexOf("/"), cleanUrl.length);
}
