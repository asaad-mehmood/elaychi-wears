// The ONE place pages get shop data from.
//
// Today it reads the local demo file (src/data/catalogue.ts). To connect a real
// admin panel later, replace the bodies of these functions with Sanity fetches
// using the GROQ queries below. The return types stay the same, so no page or
// component has to change.

import { categories, products, settings } from "@/data/catalogue";
import type { Category, Product, ShopSettings } from "@/data/types";

// GROQ queries to use once the shop has a Sanity project (see /studio-schema).
export const PRODUCTS_QUERY = /* groq */ `
*[_type == "product" && defined(slug.current)] | order(order asc) {
  _id, _type, title, subtitle, slug, code, price, salePrice,
  "category": category->{ _id, title, slug },
  "images": images[]{ _key, "url": asset->url, alt, credit },
  colour, fabric, pieces, description, sizesInStock, sizeMode, isNew, order
}`;

export const CATEGORIES_QUERY = /* groq */ `
*[_type == "category"] | order(order asc) { _id, _type, title, slug, blurb, order }`;

export const SETTINGS_QUERY = /* groq */ `
*[_type == "shopSettings"][0] { name, tagline, city, whatsapp, instagram, deliveryNote, freeDeliveryOver }`;

export async function getProducts(): Promise<Product[]> {
  return [...products].sort((a, b) => a.order - b.order);
}

export async function getCategories(): Promise<Category[]> {
  return [...categories].sort((a, b) => a.order - b.order);
}

export async function getSettings(): Promise<ShopSettings> {
  return settings;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug.current === slug);
}
