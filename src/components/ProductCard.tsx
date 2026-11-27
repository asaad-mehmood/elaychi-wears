/* eslint-disable @next/next/no-img-element -- static export: images are plain <img> with srcset */
import Link from "next/link";
import type { Product } from "@/data/types";
import { isSoldOut, rupees, salePercent } from "@/lib/format";
import { imgUrl, srcSet } from "@/lib/img";

const WIDTHS = [320, 480, 640, 860];
const SIZES = "(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw";

export function ProductCard({ product: p, eager = false }: { product: Product; eager?: boolean }) {
  const main = p.images[0];
  const alt = p.images[1];
  const soldOut = isSoldOut(p);
  const off = salePercent(p.price, p.salePrice);

  return (
    <Link href={`/product/${p.slug.current}/`} className="group block">
      <div className="img-bg relative aspect-[4/5] overflow-hidden">
        <img
          src={imgUrl(main.url, 640)}
          srcSet={srcSet(main.url, WIDTHS)}
          sizes={SIZES}
          alt={main.alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          className={`h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03] ${soldOut ? "opacity-60 grayscale-[40%]" : ""}`}
        />
        {alt && (
          <img
            src={imgUrl(alt.url, 640)}
            srcSet={srcSet(alt.url, WIDTHS)}
            sizes={SIZES}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {p.isNew && !soldOut && <span className="bg-paper/95 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]">New</span>}
          {off && !soldOut && <span className="bg-sindoor px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-paper">{off}% off</span>}
          {p.sizeMode === "made-to-order" && <span className="bg-ink px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-paper">Made to order</span>}
        </div>
        {soldOut && (
          <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-2 text-center text-[11px] uppercase tracking-[0.2em] text-paper">
            Sold out
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[19px] leading-tight [font-variation-settings:'opsz'_36]">{p.title}</h3>
          <p className="mt-0.5 truncate text-[12.5px] text-muted">{p.subtitle}</p>
        </div>
        <div className="shrink-0 text-right text-[13.5px] tnum">
          {p.salePrice ? (
            <>
              <span className="block text-sindoor">{rupees(p.salePrice)}</span>
              <s className="block text-[12px] text-muted">{rupees(p.price)}</s>
            </>
          ) : (
            <span>{p.sizeMode === "made-to-order" ? "from " : ""}{rupees(p.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
