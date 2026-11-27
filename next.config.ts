import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// node_modules is a symlink to ../abdul-haadi-shoaib/node_modules on Asaad's Mac
// (to save disk space). Turbopack then needs to be allowed to look one folder
// up. On Cloudflare (a normal npm install) this is skipped.
const symlinkedModules = (() => {
  try {
    return fs.lstatSync(path.join(__dirname, "node_modules")).isSymbolicLink();
  } catch {
    return false;
  }
})();

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

  ...(symlinkedModules ? { turbopack: { root: path.join(__dirname, "..") } } : {}),
};

export default nextConfig;
