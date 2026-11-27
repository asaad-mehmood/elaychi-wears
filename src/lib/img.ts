// Builds resized image URLs. Unsplash (and Sanity's image CDN, later) resize on
// the fly from URL parameters, so phones download small files.
export function imgUrl(url: string, width: number, quality = 70): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}w=${width}&q=${quality}&auto=format&fit=crop`;
}

export function srcSet(url: string, widths: number[], quality = 70): string {
  return widths.map((w) => `${imgUrl(url, w, quality)} ${w}w`).join(", ");
}
