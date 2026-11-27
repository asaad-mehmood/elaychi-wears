import { rupees } from "./format";

type OrderLine = {
  title: string;
  subtitle: string;
  code: string;
  price: number;
  size?: string;
  url?: string;
};

// The text the customer sends. Clear enough that the shop never has to ask
// "which one?" or "which size?".
export function orderMessage(o: OrderLine): string {
  const lines = [
    "Assalam o Alaikum! I'd like to order:",
    "",
    `*${o.title}* (${o.subtitle})`,
    `Code: ${o.code}`,
    o.size ? `Size: ${o.size}` : "Size: made to order (please share measurements)",
    `Price: ${rupees(o.price)}`,
  ];
  if (o.url) lines.push("", o.url);
  lines.push("", "Is it available?");
  return lines.join("\n");
}

export function waLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
