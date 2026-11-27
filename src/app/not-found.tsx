import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl">This piece isn&apos;t here</h1>
      <p className="mt-3 text-muted">It may have sold out or moved. Have a look at what&apos;s in stock.</p>
      <Link href="/" className="mt-8 inline-block bg-ink px-5 py-3 text-paper">Back to the shop</Link>
    </div>
  );
}
