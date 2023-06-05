export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function changeGoodreadsImageSize(imageUrl: string, size: number) {
  const regex = /(_S)([XY]\d+)(_\.)/;
  return imageUrl.replace(regex, `$1Y${size}$3`);
}
