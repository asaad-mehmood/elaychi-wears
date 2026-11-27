// "Rs 8,450" — Pakistani style grouping (lakh) for big numbers: 1,85,000.
export function rupees(n: number): string {
  return "Rs " + n.toLocaleString("en-IN");
}

export function isSoldOut(p: { sizeMode: string; sizesInStock: string[] }): boolean {
  return p.sizeMode === "standard" && p.sizesInStock.length === 0;
}

export function salePercent(price: number, salePrice?: number): number | null {
  if (!salePrice || salePrice >= price) return null;
  return Math.round((1 - salePrice / price) * 100);
}
