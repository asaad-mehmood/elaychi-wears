"use client";

import { setBagOpen, useCart } from "@/lib/cart";
import { BagIcon } from "./Icons";

export function BagButton() {
  const lines = useCart();
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return (
    <button
      type="button"
      onClick={() => setBagOpen(true)}
      className="relative -mr-1 grid h-10 w-10 place-items-center rounded-full hover:bg-elaychi-mist"
      aria-label={count ? `Open bag, ${count} ${count === 1 ? "item" : "items"}` : "Open bag (empty)"}
    >
      <BagIcon className="h-[22px] w-[22px]" />
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-elaychi px-1 text-[10.5px] font-medium leading-none text-paper tnum">
          {count}
        </span>
      )}
    </button>
  );
}
