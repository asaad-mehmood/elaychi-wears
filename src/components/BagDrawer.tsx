"use client";
/* eslint-disable @next/next/no-img-element -- static export: plain <img> */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product, ShopSettings } from "@/data/types";
import { MAX_QTY, clearCart, setBagOpen, setQty, useBagOpen, useCart } from "@/lib/cart";
import { rupees } from "@/lib/format";
import { imgUrl } from "@/lib/img";
import { bagMessage, waLink } from "@/lib/whatsapp";
import { PodMark, WhatsAppIcon } from "./Icons";

type Mini = Pick<Product, "slug" | "title" | "subtitle" | "code" | "price" | "salePrice" | "images" | "sizesInStock">;

export function BagDrawer({ products, settings: s }: { products: Mini[]; settings: ShopSettings }) {
  const open = useBagOpen();
  const lines = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [sent, setSent] = useState(false);

  // Close on Escape, lock page scroll while open, focus the close button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBagOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const items = lines
    .map((l) => {
      const p = products.find((x) => x.slug.current === l.slug);
      return p ? { line: l, p, price: p.salePrice ?? p.price, inStock: p.sizesInStock.includes(l.size) } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  const count = items.reduce((n, i) => n + i.line.qty, 0);
  const total = items.reduce((t, i) => t + i.price * i.line.qty, 0);
  const orderable = items.filter((i) => i.inStock);

  const message = bagMessage(
    orderable.map((i) => ({ title: i.p.title, code: i.p.code, size: i.line.size, qty: i.line.qty, price: i.price })),
    { name: name.trim(), city: city.trim(), address: address.trim() },
    { freeOver: s.freeDeliveryOver },
  );

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        className={`absolute inset-0 bg-seed/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setBagOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-paper shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-2xl [font-variation-settings:'opsz'_72]">
            Your bag {count > 0 && <span className="text-[14px] text-muted tnum">({count})</span>}
          </h2>
          <button ref={closeRef} type="button" onClick={() => setBagOpen(false)} className="grid h-10 w-10 place-items-center rounded-full text-2xl leading-none hover:bg-elaychi-mist" aria-label="Close bag">
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <PodMark className="h-14 w-14 -rotate-12 opacity-80" />
            <p className="font-display text-xl">{sent ? "Order sent. Shukriya!" : "Your bag is empty"}</p>
            <p className="text-sm text-muted">
              {sent ? "We'll confirm on WhatsApp shortly." : "Open any piece, choose your size and tap “Add to bag”."}
            </p>
            <button type="button" onClick={() => setBagOpen(false)} className="mt-2 bg-elaychi px-5 py-3 text-[14px] text-paper hover:bg-elaychi-2">
              Keep shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5">
              <ul className="divide-y divide-line">
                {items.map(({ line, p, price, inStock }) => (
                  <li key={`${line.slug}-${line.size}`} className="flex gap-3 py-4">
                    <Link href={`/product/${p.slug.current}/`} onClick={() => setBagOpen(false)} className="img-bg block aspect-[4/5] w-20 shrink-0 overflow-hidden">
                      <img src={imgUrl(p.images[0].url, 200)} alt="" className="h-full w-full object-cover object-top" loading={open ? "eager" : "lazy"} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-display text-[17px] leading-tight">{p.title}</p>
                          <p className="text-[12.5px] text-muted">
                            Size {line.size} · <span className="tnum">{p.code}</span>
                          </p>
                        </div>
                        <p className="shrink-0 text-[14px] tnum">{rupees(price * line.qty)}</p>
                      </div>
                      {!inStock && <p className="mt-1 text-[12.5px] text-sindoor">Size {line.size} just sold out. It won&apos;t be in the order.</p>}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-line">
                          <button type="button" className="h-9 w-9 text-lg hover:bg-elaychi-mist" aria-label={`One less ${p.title}`} onClick={() => setQty(line.slug, line.size, line.qty - 1)}>
                            −
                          </button>
                          <span className="w-8 text-center text-[14px] tnum" aria-live="polite">{line.qty}</span>
                          <button
                            type="button"
                            className="h-9 w-9 text-lg hover:bg-elaychi-mist disabled:opacity-30"
                            aria-label={`One more ${p.title}`}
                            disabled={line.qty >= MAX_QTY}
                            onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button type="button" onClick={() => setQty(line.slug, line.size, 0)} className="text-[12.5px] text-muted underline underline-offset-2 hover:text-ink">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Delivery details (optional)</p>
                <div className="mt-3 grid gap-2">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className="w-full border border-line bg-paper px-3 py-2.5 text-[15px] outline-none focus:border-elaychi" />
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" autoComplete="address-level2" className="w-full border border-line bg-paper px-3 py-2.5 text-[15px] outline-none focus:border-elaychi" />
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" rows={2} autoComplete="street-address" className="w-full resize-none border border-line bg-paper px-3 py-2.5 text-[15px] outline-none focus:border-elaychi" />
                </div>
                <p className="mt-2 text-[12px] text-muted">These only go into your WhatsApp message. Nothing is saved on this site.</p>
              </div>
            </div>

            <footer className="border-t border-line bg-elaychi-mist/60 px-5 pb-[max(env(safe-area-inset-bottom),16px)] pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px]">Total</span>
                <span className="font-display text-2xl tnum">{rupees(total)}</span>
              </div>
              <p className="mt-0.5 text-[12.5px] text-muted">
                {total >= s.freeDeliveryOver ? "Free delivery · " : `Free delivery over ${rupees(s.freeDeliveryOver)} · `}Cash on delivery
              </p>
              <a
                href={waLink(s.whatsapp, message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!orderable.length) {
                    e.preventDefault();
                    return;
                  }
                  setSent(true);
                }}
                className={`mt-3 flex w-full items-center justify-center gap-2 px-5 py-3.5 text-[15px] text-paper ${orderable.length ? "bg-elaychi hover:bg-elaychi-2" : "bg-elaychi/50"}`}
              >
                <WhatsAppIcon /> Send order on WhatsApp
              </a>
              <div className="mt-2 flex items-center justify-between text-[12.5px] text-muted">
                <span>Your message is written for you. Just press send.</span>
                {sent && (
                  <button type="button" onClick={() => clearCart()} className="shrink-0 underline underline-offset-2 hover:text-ink">
                    Sent? Empty bag
                  </button>
                )}
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
