"use client";

// The selected category, shared by the filter chips and any "show me X"
// button on the page. It lives in the URL hash (/#winter) so links can be
// shared, and every change notifies all listeners.

const EVENT = "elaychi-category";

export function subscribeCategory(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export const getCategory = () => decodeURIComponent(window.location.hash.slice(1));
export const getServerCategory = () => "";

// Bring the top of the product grid into view (only if it's out of view), so
// a filter or sort change is always visible — important on phones.
export function revealShop() {
  const el = document.getElementById("shop");
  if (!el) return;
  const top = el.getBoundingClientRect().top;
  if (top < 0 || top > window.innerHeight * 0.6) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function setCategory(slug: string, opts: { reveal?: boolean } = {}) {
  const url = slug ? `#${slug}` : window.location.pathname + window.location.search;
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(EVENT));
  if (opts.reveal) requestAnimationFrame(revealShop);
}

// Next.js updates the URL itself on <Link> clicks without firing "hashchange",
// so ask everyone to re-read the hash.
export function notifyCategory() {
  window.dispatchEvent(new Event(EVENT));
}
