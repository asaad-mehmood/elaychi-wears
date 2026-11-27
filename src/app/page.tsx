/* eslint-disable @next/next/no-img-element -- static export: plain <img> with srcset */
import Link from "next/link";
import { Catalogue } from "@/components/Catalogue";
import { ArrowIcon, WhatsAppIcon } from "@/components/Icons";
import { getCategories, getProducts, getSettings } from "@/lib/catalogue";
import { imgUrl, srcSet } from "@/lib/img";

export default async function Home() {
  const [products, categories, s] = await Promise.all([getProducts(), getCategories(), getSettings()]);
  const heroA = products.find((p) => p.slug.current === "raat") ?? products[0];
  const heroB = products.find((p) => p.slug.current === "dhuan") ?? products[1];

  return (
    <>
      {/* Hero: an editorial "winter edit" opener, small enough to see products right away on a phone. */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-8 sm:pt-12 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ilaychi">Winter edit · 2026</p>
          <h1 className="mt-4 font-display text-[44px] leading-[0.95] tracking-tight [font-variation-settings:'SOFT'_50,'opsz'_144] sm:text-6xl md:text-7xl">
            Warm colours
            <br />
            for <em className="[font-variation-settings:'SOFT'_100,'opsz'_144]">foggy</em> mornings.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            Velvet, khaddar and soft lawn, cut and stitched in {s.city}. Pick a piece, choose your size, and order
            in one tap on WhatsApp. Pay cash on delivery.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/#shop" className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[14px] text-paper hover:bg-ilaychi-2">
              Shop the collection <ArrowIcon />
            </Link>
            <Link href="/#winter" className="inline-flex items-center gap-2 border border-ink/20 px-5 py-3 text-[14px] hover:border-ink">
              Winter pieces
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <Link href={`/product/${heroA.slug.current}/`} className="img-bg block aspect-[4/5] w-[78%] overflow-hidden">
            <img
              src={imgUrl(heroA.images[0].url, 700)}
              srcSet={srcSet(heroA.images[0].url, [400, 600, 800, 1000])}
              sizes="(min-width: 768px) 36vw, 75vw"
              alt={heroA.images[0].alt}
              fetchPriority="high"
              className="h-full w-full object-cover object-top"
            />
          </Link>
          <Link
            href={`/product/${heroB.slug.current}/`}
            className="img-bg absolute bottom-[-6%] right-0 block aspect-[4/5] w-[46%] overflow-hidden border-[6px] border-paper shadow-[0_18px_40px_-18px_rgba(33,29,24,0.45)]"
          >
            <img
              src={imgUrl(heroB.images[0].url, 500)}
              srcSet={srcSet(heroB.images[0].url, [300, 450, 600])}
              sizes="(min-width: 768px) 22vw, 45vw"
              alt={heroB.images[0].alt}
              className="h-full w-full object-cover object-top"
            />
          </Link>
          <p className="absolute left-[80%] top-3 hidden w-28 font-display text-[13px] italic leading-snug text-muted md:block">
            {heroA.title} &amp; {heroB.title}, both in stock
          </p>
        </div>
      </section>

      <Catalogue products={products} categories={categories} />

      {/* How ordering works: the main selling point of a WhatsApp catalogue. */}
      <section id="how" className="mx-auto mt-20 max-w-6xl scroll-mt-20 px-4">
        <div className="border border-line bg-paper-2/50 p-6 sm:p-10">
          <h2 className="font-display text-3xl [font-variation-settings:'opsz'_96]">How to order</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              ["Pick your piece", "Open any product to see the fabric, colour and sizes in inches."],
              ["Tap Order on WhatsApp", "Your message is written for you: product, code, size and price. Just press send."],
              ["Pay on delivery", "We confirm on WhatsApp, then deliver in 3–5 working days. Cash, JazzCash or bank transfer."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="font-display text-4xl leading-none text-ilaychi/70 tnum">{i + 1}</span>
                <div>
                  <p className="font-medium">{t}</p>
                  <p className="mt-1 text-sm text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> {s.deliveryNote}
          </p>
        </div>
      </section>
    </>
  );
}
