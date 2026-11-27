import Link from "next/link";
import { BagButton } from "./BagButton";
import { PodMark } from "./Icons";

export function Header({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16">
        <Link href="/" className="group flex items-center gap-2" aria-label={`${name} home`}>
          <PodMark className="h-7 w-7 -rotate-12 transition-transform duration-500 group-hover:rotate-6 sm:h-8 sm:w-8" />
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-[25px] italic leading-none tracking-tight [font-variation-settings:'SOFT'_100,'opsz'_72] sm:text-[29px]">
              {name.split(" ")[0]}
            </span>
            <span className="text-[10.5px] font-medium uppercase tracking-[0.24em] text-elaychi sm:text-[11px]">
              {name.split(" ").slice(1).join(" ")}
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-[13px] sm:gap-5">
          <Link href="/#shop" className="hover:text-elaychi">Shop</Link>
          <Link href="/#how" className="hidden hover:text-elaychi sm:inline">How to order</Link>
          <BagButton />
        </nav>
      </div>
    </header>
  );
}
