# Elaychi Wears

A demo shop for a made-up Pakistani clothing brand, **Elaychi Wears**, built to show Instagram
sellers what Asaad can make for them: all products with prices in one link,
a category filter, a page per product, and an **Order on WhatsApp** button that
writes the order message (product, code, size, price, link) for the customer.

- Next.js 16 static export + Tailwind CSS v4 (same stack as abdul-haadi-shoaib)
- Products live in `src/data/catalogue.ts`, shaped like a Sanity query result
- `studio-schema/` has the Sanity schemas for an admin panel later
- Photos: free Unsplash photos, credited on `/credits`
- Demo orders go to +92 327 6277218 (`settings.whatsapp` in `src/data/catalogue.ts`)

Live: https://elaychi-wears.pages.dev (Cloudflare Pages, deploys automatically from `main`).

The look is taken from a green cardamom (elaychi) pod: pod green for buttons and accents, a pale cardamom tint for panels, and a pod logo (`PodMark` in `src/components/Icons.tsx`).

## Run it

```bash
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm run lint
```

`node_modules` is currently a **symlink** to `../abdul-haadi-shoaib/node_modules`
(to save disk space). If that folder moves, run `rm node_modules && npm install`.

## Make it a real client's shop

1. Copy this folder, change `settings` (name, WhatsApp number, city) and the
   products in `src/data/catalogue.ts`, swap the photos.
2. Remove `<DemoBar />` from `src/app/layout.tsx` and the demo line in `Footer.tsx`.
3. Change the colours at the top of `src/app/globals.css` to the brand's colours.
4. For an admin panel, follow `studio-schema/README.md`.
