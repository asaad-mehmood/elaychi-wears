import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoBar } from "@/components/DemoBar";
import { BagDrawer } from "@/components/BagDrawer";
import { getProducts, getSettings } from "@/lib/catalogue";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: { default: `${s.name}: ${s.tagline}`, template: `%s · ${s.name}` },
    description: `${s.tagline}. Browse the collection and order on WhatsApp. ${s.deliveryNote}.`,
    openGraph: { title: s.name, description: s.tagline, type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: "#3d4c1c",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [s, products] = await Promise.all([getSettings(), getProducts()]);
  // Only what the bag needs, to keep the page small.
  const mini = products.map(({ slug, title, subtitle, code, price, salePrice, images, sizesInStock }) => ({
    slug, title, subtitle, code, price, salePrice, images: images.slice(0, 1), sizesInStock,
  }));
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="grain min-h-dvh">
        <DemoBar whatsapp={s.whatsapp} />
        <Header name={s.name} />
        <main>{children}</main>
        <Footer settings={s} />
        <BagDrawer products={mini} settings={s} />
      </body>
    </html>
  );
}
