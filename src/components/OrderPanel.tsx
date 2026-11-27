"use client";

import { useState } from "react";
import type { Product, Size } from "@/data/types";
import { isSoldOut, rupees } from "@/lib/format";
import { orderMessage, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

export function OrderPanel({ product: p, whatsapp }: { product: Product; whatsapp: string }) {
  const [size, setSize] = useState<Size | null>(p.sizesInStock.length === 1 ? p.sizesInStock[0] : null);
  const [nudge, setNudge] = useState(false);
  const soldOut = isSoldOut(p);
  const mto = p.sizeMode === "made-to-order";
  const price = p.salePrice ?? p.price;
  const ready = mto || (!!size && !soldOut);

  function message() {
    return orderMessage({
      title: p.title,
      subtitle: p.subtitle,
      code: p.code,
      price,
      size: mto ? undefined : size ?? undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    });
  }

  function onOrder(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ready) {
      e.preventDefault();
      setNudge(true);
      document.getElementById("sizes")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // Build the link at click time so it includes the page URL.
    e.currentTarget.href = waLink(whatsapp, message());
  }

  const restockText = `Assalam o Alaikum! Please tell me when ${p.title} (${p.code}) is back in stock.`;

  const button = soldOut ? (
    <a
      href={waLink(whatsapp, restockText)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 border border-ink px-5 py-3.5 text-[15px] hover:bg-ink hover:text-paper"
    >
      <WhatsAppIcon /> Tell me when it&apos;s back
    </a>
  ) : (
    <a
      href={waLink(whatsapp, orderMessage({ title: p.title, subtitle: p.subtitle, code: p.code, price }))}
      onClick={onOrder}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex w-full items-center justify-center gap-2 px-5 py-3.5 text-[15px] text-white transition-colors ${
        ready ? "bg-whatsapp hover:bg-[#17603c]" : "bg-whatsapp/70"
      }`}
    >
      <WhatsAppIcon />
      {mto ? "Book a fitting on WhatsApp" : size ? `Order size ${size} on WhatsApp` : "Order on WhatsApp"}
    </a>
  );

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
                      ? "border-ink bg-ink text-paper"
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

      {/* Desktop / in-page button */}
      <div className="mt-3 hidden md:block">{button}</div>

      {/* Phone: the button sticks to the bottom of the screen. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur md:hidden">
        <div className="mb-2 flex items-baseline justify-between text-[13px]">
          <span className="font-display text-[16px]">{p.title}</span>
          <span className="tnum">{mto ? "from " : ""}{rupees(price)}</span>
        </div>
        {button}
      </div>
      <p className="mt-3 text-[12.5px] text-muted">
        The message is written for you with the product code, size and price. Nothing is charged until we confirm.
      </p>
    </div>
  );
}
