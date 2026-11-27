"use client";

import { setCategory } from "@/lib/category";

// A button that filters the shop to one category and scrolls to it.
export function CategoryButton({ slug, className, children }: { slug: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={`/#${slug}`}
      className={className}
      onClick={(e) => {
        if (window.location.pathname !== "/") return; // from another page: normal link
        e.preventDefault();
        setCategory(slug, { reveal: true });
      }}
    >
      {children}
    </a>
  );
}
