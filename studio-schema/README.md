# Studio schema (not used yet)

These files are the admin panel's "shape" for a real shop client: products,
categories and one shop-settings document. They are **not** part of the Next.js
build (excluded in `tsconfig.json` and `eslint.config.mjs`), because `sanity`
isn't installed in this project.

## When a seller says yes

1. Copy `abdul-haadi-shoaib-studio` to a new folder (e.g. `client-name-studio`),
   delete its `schemaTypes/` folder, and copy these files in as `schemaTypes/`
   (rename `structure.ts` usage as below).
2. In the new Studio's `sanity.config.ts`:
   - `import {schemaTypes} from './schemaTypes'`
   - `import {structure} from './schemaTypes/structure'`
   - `plugins: [structureTool({structure}), ...]`
   - Hide `shopSettings` from "create new" and block deleting it, the same way
     Haadi's Studio does for `siteSettings`.
3. Create the client's own Sanity project (`npx sanity init` in that folder),
   put its project ID in `sanity.config.ts`, then `npm run deploy`.
4. In the shop site, replace the function bodies in `src/lib/catalogue.ts` with
   Sanity fetches using the GROQ queries already written there (copy
   `src/lib/sanity.ts` from Haadi's site as a starting point).
5. Add a Sanity webhook → Cloudflare deploy hook, so publishing a product
   rebuilds the site (same setup as Haadi's).

Field names here match `src/data/types.ts` exactly, so the pages don't change.
