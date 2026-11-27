"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { Category, Product } from "@/data/types";
import { getCategory, getServerCategory, notifyCategory, revealShop, setCategory, subscribeCategory } from "@/lib/category";
import { isSoldOut } from "@/lib/format";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "low" | "high" | "new";

export function Catalogue({ products, categories }: { products: Product[]; categories: Category[] }) {
  const hash = useSyncExternalStore(subscribeCategory, getCategory, getServerCategory);
  // After arriving from another page (e.g. a breadcrumb link to /#winter), re-read the hash once.
  useEffect(() => {
    notifyCategory();
    if (categories.some((c) => c.slug.current === getCategory())) requestAnimationFrame(revealShop);
  }, [categories]);
  const active = categories.some((c) => c.slug.current === hash) ? hash : "";
  const [sort, setSortState] = useState<Sort>("featured");
  const setSort = (v: Sort) => {
    setSortState(v);
    requestAnimationFrame(revealShop);
  };

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of products) m[p.category.slug.current] = (m[p.category.slug.current] ?? 0) + 1;
    return m;
  }, [products]);

  const shown = useMemo(() => {
    const list = active ? products.filter((p) => p.category.slug.current === active) : [...products];
    const price = (p: Product) => p.salePrice ?? p.price;
    list.sort((a, b) => {
      // Sold-out items always sink to the end.
      const so = Number(isSoldOut(a)) - Number(isSoldOut(b));
      if (so) return so;
      if (sort === "low") return price(a) - price(b);
      if (sort === "high") return price(b) - price(a);
      if (sort === "new") return Number(b.isNew) - Number(a.isNew) || a.order - b.order;
      return a.order - b.order;
    });
    return list;
  }, [products, active, sort]);

  const activeCat = categories.find((c) => c.slug.current === active);

  return (
    <section id="shop" className="scroll-mt-16">
      <div className="sticky top-14 z-20 border-y border-line bg-paper/95 backdrop-blur sm:top-16">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4">
          <div className="no-scrollbar -mx-1 flex flex-1 gap-1 overflow-x-auto py-2.5" role="tablist" aria-label="Categories">
            <Chip label="All" count={products.length} active={!active} onClick={() => setCategory("", { reveal: true })} />
            {categories.map((c) => (
              <Chip
                key={c._id}
                label={c.title}
                count={counts[c.slug.current] ?? 0}
                active={active === c.slug.current}
                onClick={() => setCategory(c.slug.current, { reveal: true })}
              />
            ))}
          </div>
          <label className="hidden shrink-0 items-center gap-2 text-[12px] text-muted sm:flex">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-none border border-line bg-paper px-2 py-1.5 text-[13px] text-ink"
            >
              <option value="featured">Featured</option>
              <option value="new">New in</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl leading-none [font-variation-settings:'opsz'_96]">
              {activeCat ? activeCat.title : "The collection"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {activeCat ? activeCat.blurb : "Everything in stock right now, plus made-to-order bridal."}{" "}
              <span className="tnum text-elaychi" aria-live="polite">· {shown.length} {shown.length === 1 ? "piece" : "pieces"}</span>
            </p>
          </div>
          <label className="flex shrink-0 items-center gap-2 text-[12px] text-muted sm:hidden">
            <span className="sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-none border border-line bg-paper px-2 py-1.5 text-[13px] text-ink"
            >
              <option value="featured">Featured</option>
              <option value="new">New in</option>
              <option value="low">Price ↑</option>
              <option value="high">Price ↓</option>
            </select>
          </label>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
          {shown.map((p, i) => (
            <li key={p._id}>
              <ProductCard product={p} eager={i < 4} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Chip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
        active ? "bg-elaychi text-paper" : "text-ink hover:bg-elaychi-mist"
      }`}
    >
      {label} <span className={`tnum text-[11px] ${active ? "text-paper/60" : "text-muted"}`}>{count}</span>
    </button>
  );
}
