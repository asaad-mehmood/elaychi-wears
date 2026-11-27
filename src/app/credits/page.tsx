import type { Metadata } from "next";
import { getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Photo credits" };

export default async function Credits() {
  const products = await getProducts();
  const rows = products.flatMap((p) => p.images.filter((i) => i.credit).map((i) => ({ product: p.title, ...i })));
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10">
      <h1 className="font-display text-4xl [font-variation-settings:'opsz'_144]">Photo credits</h1>
      <p className="mt-3 text-[15px] text-muted">
        This is a demo shop. All product photos are free photos from{" "}
        <a href="https://unsplash.com/?utm_source=elaychi_wears&utm_medium=referral" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">Unsplash</a>{" "}
        (Unsplash License). Thank you to these photographers. The brand, product names and prices are made up.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line text-[14px]">
        {rows.map((r) => (
          <li key={r.url} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
            <span>
              <span className="font-display text-[17px]">{r.product}</span>{" "}
              <a href={r.credit!.photoUrl} target="_blank" rel="noopener noreferrer" className="text-muted underline-offset-2 hover:underline">view photo</a>
            </span>
            <a href={r.credit!.profileUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              Photo by {r.credit!.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
