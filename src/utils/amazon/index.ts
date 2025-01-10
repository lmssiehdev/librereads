/**
 * Extracts the ASIN (Amazon Standard Identification Number) from an Amazon product URL.
 */
export function extractAsin(url: string): string | null {
  const patterns = [
    /\/dp\/([A-Z0-9]{10})\//,
    /\/gp\/product\/([A-Z0-9]{10})\//,
    /\/gp\/aw\/d\/([A-Z0-9]{10})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

export function getCleanAmazonUrl(url: string) {
  if (!url) return null;
  if (isSearchOrProduct(url)) {
    return cleanSearchUrl(url);
  }
  const asin = extractAsin(url);
  return asin ? `/amazon/${asin}` : null;
}

function cleanSearchUrl(url: string) {
  const urlObj = new URL(url);
  const cleanParams = new URLSearchParams();

  // Keep only search and format params
  const keepParams = ["k", "i"];
  // biome-ignore lint/complexity/noForEach: <explanation>
  keepParams.forEach((param) => {
    if (urlObj.searchParams.has(param)) {
      cleanParams.set(param, urlObj.searchParams.get(param) as string);
    }
  });

  return `${urlObj.origin}${urlObj.pathname}?${cleanParams.toString()}`;
}

function isSearchOrProduct(url: string) {
  const urlObj = new URL(url);

  return urlObj.pathname.includes("/s") || urlObj.searchParams.has("k");
}
