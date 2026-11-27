import Link from "next/link";
import type { ShopSettings } from "@/data/types";
import { rupees } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { PodMark, WhatsAppIcon } from "./Icons";

export function Footer({ settings: s }: { settings: ShopSettings }) {
  return (
    <footer className="mt-24 border-t border-line bg-elaychi-mist/70">
      <div className="pod-rule -mt-[7px]" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl italic [font-variation-settings:'SOFT'_100]">
            <PodMark className="h-7 w-7 -rotate-12" /> {s.name}
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">{s.tagline}. Named after elaychi, the green cardamom in every good cup of chai: small, warm, and made with care.</p>
          <a
            href={waLink(s.whatsapp, "Assalam o Alaikum! I have a question about your collection.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-elaychi/30 px-4 py-2 text-sm hover:border-elaychi hover:text-elaychi"
          >
            <WhatsAppIcon className="h-4 w-4" /> Ask us on WhatsApp
          </a>
        </div>
        <div className="text-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Delivery</p>
          <ul className="mt-3 space-y-2">
            <li>Cash on delivery all over Pakistan</li>
            <li>3–5 working days, bridal 8–10 weeks</li>
            <li className="tnum">Free delivery over {rupees(s.freeDeliveryOver)}</li>
            <li>Exchange within 7 days, unworn with tags</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Pay with</p>
          <ul className="mt-3 space-y-2">
            <li>Cash on delivery</li>
            <li>JazzCash / Easypaisa</li>
            <li>Bank transfer</li>
          </ul>
          <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted">This site</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/credits/" className="underline-offset-2 hover:underline">Photo credits</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-elaychi/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-[12px] text-muted">
          Demo store by Asaad Mehmood. Products, prices and the brand are made up; photos from Unsplash.
        </p>
      </div>
    </footer>
  );
}
