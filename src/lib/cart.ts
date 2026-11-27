"use client";

// A tiny shopping bag kept in the visitor's browser (localStorage), so it
// survives page changes and refreshes. No server or account needed: the
// order is sent as one WhatsApp message.

import { useSyncExternalStore } from "react";
import type { Size } from "@/data/types";

export type CartLine = { slug: string; size: Size; qty: number };

const KEY = "elaychi-wears-bag";
const EVENT = "elaychi-bag";
export const MAX_QTY = 5;

const EMPTY: CartLine[] = [];
let cacheRaw: string | null = null;
let cache: CartLine[] = EMPTY;

function read(): CartLine[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  try {
    const v = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(v) ? v.filter((l) => l && typeof l.slug === "string" && typeof l.size === "string" && l.qty > 0) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(lines: CartLine[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Private mode / storage blocked: keep it in memory for this page.
    cacheRaw = JSON.stringify(lines);
    cache = lines;
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart(): CartLine[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function addToCart(slug: string, size: Size) {
  const lines = [...read()];
  const i = lines.findIndex((l) => l.slug === slug && l.size === size);
  if (i >= 0) lines[i] = { ...lines[i], qty: Math.min(MAX_QTY, lines[i].qty + 1) };
  else lines.push({ slug, size, qty: 1 });
  write(lines);
}

export function setQty(slug: string, size: Size, qty: number) {
  const lines = read()
    .map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(0, Math.min(MAX_QTY, qty)) } : l))
    .filter((l) => l.qty > 0);
  write(lines);
}

export function clearCart() {
  write([]);
}

// Whether the bag panel is open (shared by the header button, the panel and "Add to bag").
const OPEN_EVENT = "elaychi-bag-open";
let open = false;
export function setBagOpen(v: boolean) {
  open = v;
  window.dispatchEvent(new Event(OPEN_EVENT));
}
export function useBagOpen(): boolean {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(OPEN_EVENT, cb);
      return () => window.removeEventListener(OPEN_EVENT, cb);
    },
    () => open,
    () => false,
  );
}
