"use client";

import { useState } from "react";
import type { Product, Size } from "@/data/types";
import { addToCart, setBagOpen } from "@/lib/cart";
import { isSoldOut, rupees } from "@/lib/format";
import { orderMessage, waLink } from "@/lib/whatsapp";
import { BagIcon, WhatsAppIcon } from "./Icons";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

export function OrderPanel({ product: p, whatsapp }: { product: Product; whatsapp: string }) {
  const [size, setSize] = useState<Size | null>(p.sizesInStock.length === 1 ? p.sizesInStock[0] : null);
  const [nudge, setNudge] = useState(false);
  const soldOut = isSoldOut(p);
  const mto = p.sizeMode === "made-to-order";
  const price = p.salePrice ?? p.price;

  // Ask for a size first; returns false (and points at the sizes) if none is chosen.
  function needSize(): boolean {
    if (mto || size) return false;
    setNudge(true);
    document.getElementById("sizes")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }

  function onAdd() {
    if (needSize() || !size) return;
    addToCart(p.slug.current, size);
    setBagOpen(true);
  }

  function onOrderNow(e: React.MouseEvent<HTMLAnchorElement>) {
    if (needSize()) {
      e.preventDefault();
      return;
    }
    // Build the link at click time so it includes the page URL.
    e.currentTarget.href = waLink(
      whatsapp,
      orderMessage({ title: p.title, subtitle: p.subtitle, code: p.code, price, size: mto ? undefined : size ?? undefined, url: window.location.href }),
    );
  }

  const restockText = `Assalam o Alaikum! Please tell me when ${p.title} (${p.code}) is back in stock.`;
  const fallbackHref = waLink(whatsapp, orderMessage({ title: p.title, subtitle: p.subtitle, code: p.code, price }));

  let buttons: React.ReactNode;
  if (soldOut) {
    buttons = (
      <a href={waLink(whatsapp, restockText)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 border border-elaychi px-5 py-3.5 text-[15px] text-elaychi-2 hover:bg-elaychi hover:text-paper">
        <WhatsAppIcon /> Tell me when it&apos;s back
      </a>
    );
  } else if (mto) {
    buttons = (
      <a href={fallbackHref} onClick={onOrderNow} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 bg-elaychi px-5 py-3.5 text-[15px] text-paper hover:bg-elaychi-2">
        <WhatsAppIcon /> Book a fitting on WhatsApp
      </a>
    );
  } else {
    buttons = (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onAdd}
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-[15px] text-paper transition-colors ${size ? "bg-elaychi hover:bg-elaychi-2" : "bg-elaychi/75"}`}
        >
          <BagIcon className="h-[18px] w-[18px]" /> {size ? `Add size ${size} to bag` : "Add to bag"}
        </button>
        <a
          href={fallbackHref}
          onClick={onOrderNow}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center justify-center gap-2 border border-elaychi/50 px-4 py-3.5 text-[14px] text-elaychi-2 hover:border-elaychi"
          aria-label="Order just this piece now on WhatsApp"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" /> <span>Order now</span>
        </a>
      </div>
    );
  }

  return (
    <div>
      {!mto && (
        <div id="sizes" className="scroll-mt-24">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Size</p>
            <a href="#size-guide" className="text-[12px] underline underline-offset-2">Size guide (inches)</a>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {ALL_SIZES.map((sz) => {
              const ok = p.sizesInStock.includes(sz);
              const on = size === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  disabled={!ok}
                  onClick={() => {
                    setSize(sz);
                    setNudge(false);
                  }}
                  aria-pressed={on}
                  className={`h-11 border text-[14px] tnum transition-colors ${
                    on
                      ? "border-elaychi bg-elaychi text-paper"
                      : ok
                        ? "border-line bg-paper hover:border-ink"
                        : "cursor-not-allowed border-line/60 text-muted/50 line-through"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
          <p className={`mt-2 min-h-5 text-[12.5px] ${nudge ? "text-sindoor" : "text-muted"}`} aria-live="polite">
            {soldOut
              ? "Sold out in every size right now."
              : nudge
                ? "Please choose a size first."
                : p.sizesInStock.length < 3
                  ? `Only ${p.sizesInStock.join(", ")} left.`
                  : ""}
          </p>
        </div>
      )}

      {/* Desktop / in-page buttons */}
      <div className="mt-3 hidden md:block">{buttons}</div>

      {/* Phone: the buttons stick to the bottom of the screen. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur md:hidden">
        <div className="mb-2 flex items-baseline justify-between text-[13px]">
          <span className="font-display text-[16px]">{p.title}</span>
          <span className="tnum">{mto ? "from " : ""}{rupees(price)}</span>
        </div>
        {buttons}
      </div>
      <p className="mt-3 text-[12.5px] text-muted">
        {mto
          ? "Bridal is made to your measurements. We'll set up a fitting on WhatsApp."
          : "Add a few pieces to your bag and send them in one WhatsApp message, or order just this one now. Nothing is charged until we confirm."}
      </p>
    </div>
  );
}
