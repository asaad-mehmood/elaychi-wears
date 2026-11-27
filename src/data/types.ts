// These types match what a Sanity GROQ query will return later (see
// src/lib/catalogue.ts and the schemas in /studio-schema). Keeping the same
// shape now means switching from the local file to Sanity is a one-file change.

export type SanityImage = {
  _key: string;
  // Full image URL. In Sanity this comes from `asset->url`.
  url: string;
  alt: string;
  // Photo credit (needed for Unsplash demo photos; optional for a real shop).
  credit?: {
    name: string;
    profileUrl: string;
    photoUrl: string;
  };
};

export type Category = {
  _id: string;
  _type: "category";
  title: string;
  slug: { current: string };
  // Short line shown under the category name.
  blurb: string;
  order: number;
};

export type Size = "XS" | "S" | "M" | "L" | "XL";

export type Product = {
  _id: string;
  _type: "product";
  title: string;
  // Short "what is it" line under the title, e.g. "Embroidered 3-piece".
  subtitle: string;
  slug: { current: string };
  // Shop's own product code, sent in the WhatsApp message so the order is unambiguous.
  code: string;
  // Prices are whole Pakistani rupees.
  price: number;
  // If set, shown as the sale price with the normal price crossed out.
  salePrice?: number;
  category: Pick<Category, "_id" | "title" | "slug">;
  images: SanityImage[];
  colour: string;
  fabric: string;
  pieces: string;
  description: string;
  // Sizes that can be ordered right now. Empty array = sold out.
  sizesInStock: Size[];
  // Unstitched / made-to-order items don't use sizes.
  sizeMode: "standard" | "made-to-order";
  isNew: boolean;
  // Lower number = shown first under "Featured".
  order: number;
};

export type ShopSettings = {
  name: string;
  tagline: string;
  city: string;
  // WhatsApp number in international format, digits only (e.g. 923001234567).
  whatsapp: string;
  instagram: string;
  deliveryNote: string;
  freeDeliveryOver: number;
};
