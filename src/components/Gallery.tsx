"use client";
/* eslint-disable @next/next/no-img-element -- static export: plain <img> with srcset */

import { useState } from "react";
import type { SanityImage } from "@/data/types";
import { imgUrl, srcSet } from "@/lib/img";

export function Gallery({ images, soldOut }: { images: SanityImage[]; soldOut: boolean }) {
  const [i, setI] = useState(0);
  const img = images[i] ?? images[0];
  return (
    <div>
      <div className="img-bg relative aspect-[4/5] overflow-hidden">
        <img
          key={img._key}
          src={imgUrl(img.url, 900)}
          srcSet={srcSet(img.url, [480, 720, 960, 1280], 75)}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={img.alt}
          fetchPriority="high"
          className={`h-full w-full object-cover object-top ${soldOut ? "opacity-70 grayscale-[35%]" : ""}`}
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-paper/90 px-2 py-1 text-[11px] tnum">
            {i + 1} / {images.length}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((im, n) => (
            <button
              key={im._key}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show photo ${n + 1}`}
              aria-pressed={n === i}
              className={`img-bg aspect-[4/5] w-16 overflow-hidden border-2 ${n === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={imgUrl(im.url, 160)} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
