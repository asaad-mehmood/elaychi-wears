import { waLink } from "@/lib/whatsapp";

// Thin strip at the very top. Makes it honest that this is a demo, and turns
// every visitor into a possible lead for Asaad.
export function DemoBar({ whatsapp }: { whatsapp: string }) {
  const href = waLink(whatsapp, "Hi Asaad! I saw your demo shop (Elaychi Wears). I'd like a shop page like this for my brand.");
  return (
    <div className="bg-elaychi-2 text-paper">
      <p className="mx-auto max-w-6xl px-4 py-2 text-center text-[12px] leading-snug tracking-wide">
        Demo shop built by Asaad Mehmood. Elaychi Wears isn&apos;t a real brand.{" "}
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-paper/40 underline-offset-2 hover:decoration-paper">
          Want one for your shop?
        </a>
      </p>
    </div>
  );
}
