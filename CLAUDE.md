# CLAUDE.md

## About Asaad / working rules

- Asaad, 18, Pakistan, beginner developer (also a video editor). Mac: 2014 MacBook Pro, 8 GB RAM, macOS 14, VS Code.
- Explain in simple English. Go one step at a time and wait for his approval before the next step in multi-step work, unless he says to work autonomously.
- Never push, deploy or change live data without asking. Never commit secrets.
- Goal right now: land his first paid web-dev client by ~9 Dec 2026; this project is the sample for Instagram sellers ("product #2").

## What this repo is

"Elaychi Wears": demo WhatsApp-order shop catalogue for a made-up Lahore clothing brand (folder/repo/Cloudflare project all named `elaychi-wears`). Colours come from a green cardamom (elaychi) pod — tokens `--elaychi`, `--elaychi-2`, `--elaychi-pod`, `--elaychi-mist`, `--seed` in `globals.css`; logo is `PodMark`. Product codes are `EW-xxx`. Next.js 16 App Router, TypeScript, Tailwind v4, `output: "export"` + `trailingSlash: true` (every page is `folder/index.html`). Live at https://elaychi-wears.pages.dev — Cloudflare Pages project `elaychi-wears`, connected to GitHub `asaad-mehmood/elaychi-wears` (`main` auto-deploys; build `npm run build`, output `out`, NODE_VERSION 22).

## File map

- `src/data/types.ts` — `Product`, `Category`, `ShopSettings` types. Field names match the Sanity schemas in `studio-schema/`.
- `src/data/catalogue.ts` — all demo content (settings incl. WhatsApp number, 5 categories, 17 products). Images hot-link Unsplash's CDN with credits.
- `src/lib/catalogue.ts` — the only data access layer (`getProducts`, `getCategories`, `getSettings`, `getProduct`) + GROQ queries for later.
- `src/lib/whatsapp.ts` — order message text and `wa.me` link builder. `format.ts` (rupees in lakh grouping, sold-out, sale %), `img.ts` (resized image URLs / srcset).
- `src/app/page.tsx` — hero, catalogue, "How to order". `src/app/product/[slug]/page.tsx` — product page (static params). `src/app/credits/page.tsx` — photo credits.
- `src/components/Catalogue.tsx` — client filter + sort. The selected category lives in the URL hash and is shared through `src/lib/category.ts` (`setCategory`, `revealShop`); `CategoryButton.tsx` is a link that filters + scrolls (e.g. hero "Winter pieces"). Every filter/sort change scrolls the grid back into view, so it's visible on phones.
- Bag (cart): `src/lib/cart.ts` (localStorage store `elaychi-wears-bag`, `useCart`, `addToCart`, `setQty`, open state), `BagButton.tsx` (header icon + count), `BagDrawer.tsx` (slide-in panel in the layout: qty, remove, optional name/city/address, total, one WhatsApp message via `bagMessage` in `whatsapp.ts`). `OrderPanel.tsx` — size picker + "Add to bag" + "Order now" (WhatsApp, this piece only); sticky on phones. Made-to-order bridal skips the bag ("Book a fitting"). `Gallery.tsx`, `ProductCard.tsx`, `Header.tsx`, `Footer.tsx`, `DemoBar.tsx`.
- `studio-schema/` — Sanity schemas (product, category, shopSettings, structure). Excluded from tsconfig/eslint.

## Quirks

- `node_modules` is a symlink to `../abdul-haadi-shoaib/node_modules` (disk is tight). `next.config.ts` sets `turbopack.root` to the parent folder because of that. `package-lock.json` is Haadi's lockfile with the name changed, so Cloudflare installs identical versions.
- Plain `<img>` with srcset everywhere (static export, no image optimizer); the `no-img-element` lint rule is disabled per file.
- Category filter state is the URL hash (`/#winter`), so links to a category work. Next `<Link>` hash clicks don't fire `hashchange`, so use `CategoryButton`/`setCategory` for in-page category links.
