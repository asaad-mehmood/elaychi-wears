import Link from "next/link";

export function Header({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${name} home`}>
          <span className="font-display text-[26px] italic leading-none tracking-tight [font-variation-settings:'SOFT'_100,'opsz'_72] sm:text-[30px]">
            {name.toLowerCase()}
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:inline">Lahore</span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px]">
          <Link href="/#shop" className="hover:text-ilaychi">Shop</Link>
          <Link href="/#how" className="hover:text-ilaychi">How to order</Link>
        </nav>
      </div>
    </header>
  );
}
