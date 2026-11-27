import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { OrderPanel } from "@/components/OrderPanel";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, getProducts, getSettings } from "@/lib/catalogue";
import { isSoldOut, rupees, salePercent } from "@/lib/format";
import { imgUrl } from "@/lib/img";

// Static export: every product page is built ahead of time.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug.current }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title}, ${p.subtitle}`,
    description: `${p.subtitle} in ${p.colour.toLowerCase()}. ${rupees(p.salePrice ?? p.price)}. Order on WhatsApp, cash on delivery.`,
    openGraph: { images: [imgUrl(p.images[0].url, 1200)] },
  };
}

// Pakistani ready-to-wear sizes aren't standard, so show inches.
const SIZE_GUIDE = [
  ["XS", "34", "14", "40"],
  ["S", "36", "14.5", "40"],
  ["M", "38", "15", "41"],
  ["L", "41", "15.5", "42"],
  ["XL", "44", "16", "42"],
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [p, all, s] = await Promise.all([getProduct(slug), getProducts(), getSettings()]);
  if (!p) notFound();

  const soldOut = isSoldOut(p);
  const off = salePercent(p.price, p.salePrice);
  const related = [
    ...all.filter((x) => x._id !== p._id && x.category._id === p.category._id),
    ...all.filter((x) => x._id !== p._id && x.category._id !== p.category._id),
  ].slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-40 pt-5 md:pb-10">
      <nav className="text-[12px] text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">Shop</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/#${p.category.slug.current}`} className="hover:text-ink">{p.category.title}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{p.title}</span>
      </nav>

      <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
        <Gallery images={p.images} soldOut={soldOut} />

        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {p.category.title} · <span className="tnum">{p.code}</span>
          </p>
          <h1 className="mt-2 font-display text-[40px] leading-none tracking-tight [font-variation-settings:'SOFT'_60,'opsz'_144]">
            {p.title}
          </h1>
          <p className="mt-2 text-[15px] text-muted">{p.subtitle}</p>

          <p className="mt-5 flex items-baseline gap-3 text-[20px] tnum">
            {p.sizeMode === "made-to-order" && <span className="text-[13px] text-muted">from</span>}
            <span className={p.salePrice ? "text-sindoor" : ""}>{rupees(p.salePrice ?? p.price)}</span>
            {p.salePrice && <s className="text-[15px] text-muted">{rupees(p.price)}</s>}
            {off && <span className="bg-sindoor px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-paper">{off}% off</span>}
          </p>
          <p className="mt-1 text-[12.5px] text-muted">
            {p.price >= s.freeDeliveryOver ? "Free delivery · " : ""}Cash on delivery available
          </p>

          <p className="mt-6 max-w-prose text-[15px] leading-relaxed">{p.description}</p>

          <div className="mt-7">
            <OrderPanel product={p} whatsapp={s.whatsapp} />
          </div>

          <dl className="mt-8 divide-y divide-line border-y border-line text-[14px]">
            {[
              ["Colour", p.colour],
              ["Fabric", p.fabric],
              ["What you get", p.pieces],
              ["Care", p.sizeMode === "made-to-order" ? "Dry clean only" : "Hand wash cold or dry clean. Iron on reverse."],
              ["Delivery", p.sizeMode === "made-to-order" ? "8–10 weeks after your fitting" : "3–5 working days across Pakistan"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3">
                <dt className="text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {p.sizeMode === "standard" && (
            <details id="size-guide" className="group mt-4 scroll-mt-24 border-b border-line pb-3 text-[14px]">
              <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                Size guide (in inches)
                <span className="text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <table className="mt-3 w-full text-left text-[13px] tnum">
                <thead className="text-muted">
                  <tr>
                    <th className="py-1 font-normal">Size</th>
                    <th className="py-1 font-normal">Chest</th>
                    <th className="py-1 font-normal">Shoulder</th>
                    <th className="py-1 font-normal">Shirt length</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((r) => (
                    <tr key={r[0]} className="border-t border-line/70">
                      {r.map((c, i) => (
                        <td key={i} className="py-1.5">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[12px] text-muted">Between sizes? Send us your chest measurement on WhatsApp and we&apos;ll tell you which fits.</p>
            </details>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl [font-variation-settings:'opsz'_72]">You might also like</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r._id}>
                <ProductCard product={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
