# CLAUDE.md

## About Asaad / working rules

- Asaad, 18, Pakistan, beginner developer (also a video editor). Mac: 2014 MacBook Pro, 8 GB RAM, macOS 14, VS Code.
- Explain in simple English. Go one step at a time and wait for his approval before the next step in multi-step work, unless he says to work autonomously.
- Never push, deploy or change live data without asking. Never commit secrets.
- Goal right now: land his first paid web-dev client by ~9 Dec 2026; this project is the sample for Instagram sellers ("product #2").

## What this repo is

Demo WhatsApp-order shop catalogue for a fake Lahore clothing brand "Ilaychi". Next.js 16 App Router, TypeScript, Tailwind v4, `output: "export"` + `trailingSlash: true` (every page is `folder/index.html`). Not deployed yet; meant for Cloudflare Pages (build command `npm run build`, output folder `out`).

## File map

- `src/data/types.ts` — `Product`, `Category`, `ShopSettings` types. Field names match the Sanity schemas in `studio-schema/`.
- `src/data/catalogue.ts` — all demo content (settings incl. WhatsApp number, 5 categories, 17 products). Images hot-link Unsplash's CDN with credits.
- `src/lib/catalogue.ts` — the only data access layer (`getProducts`, `getCategories`, `getSettings`, `getProduct`) + GROQ queries for later.
- `src/lib/whatsapp.ts` — order message text and `wa.me` link builder. `format.ts` (rupees in lakh grouping, sold-out, sale %), `img.ts` (resized image URLs / srcset).
- `src/app/page.tsx` — hero, catalogue, "How to order". `src/app/product/[slug]/page.tsx` — product page (static params). `src/app/credits/page.tsx` — photo credits.
- `src/components/Catalogue.tsx` — client filter (category in URL hash via `useSyncExternalStore`) + sort. `OrderPanel.tsx` — size picker + WhatsApp button (sticky on phones). `Gallery.tsx`, `ProductCard.tsx`, `Header.tsx`, `Footer.tsx`, `DemoBar.tsx`.
- `studio-schema/` — Sanity schemas (product, category, shopSettings, structure). Excluded from tsconfig/eslint.

## Quirks

- `node_modules` is a symlink to `../abdul-haadi-shoaib/node_modules` (disk is tight). `next.config.ts` sets `turbopack.root` to the parent folder because of that. `package-lock.json` is Haadi's lockfile with the name changed, so Cloudflare installs identical versions.
- Plain `<img>` with srcset everywhere (static export, no image optimizer); the `no-img-element` lint rule is disabled per file.
- Category filter state is the URL hash (`/#winter`), so links to a category work.
