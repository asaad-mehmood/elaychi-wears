import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site: `next build` writes plain HTML/CSS/JS into "out".
  output: "export",

  // Every page becomes a folder with index.html (e.g. /product/anaar/),
  // which static hosts like Cloudflare Pages serve without any extra rules.
  trailingSlash: true,

  // Static hosting has no server to resize images, so images are used as-is.
  images: {
    unoptimized: true,
  },

  // node_modules is a symlink to the sibling abdul-haadi-shoaib project (to save
  // disk space), so let Turbopack look one folder up. Safe to remove once this
  // project has its own `npm install`.
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
