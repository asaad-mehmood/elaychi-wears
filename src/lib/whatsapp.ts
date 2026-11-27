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

export type BagItem = { title: string; code: string; size: string; qty: number; price: number };

// One message for the whole bag, with a total and (optional) delivery details.
export function bagMessage(
  items: BagItem[],
  customer: { name?: string; city?: string; address?: string },
  delivery: { freeOver: number },
): string {
  const total = items.reduce((t, i) => t + i.price * i.qty, 0);
  const lines = ["Assalam o Alaikum! I'd like to order:", ""];
  items.forEach((i, n) => {
    lines.push(`${n + 1}. *${i.title}* (${i.code}), size ${i.size}, qty ${i.qty}: ${rupees(i.price * i.qty)}`);
  });
  lines.push("", `*Total: ${rupees(total)}*${total >= delivery.freeOver ? " (free delivery)" : " + delivery"}`);
  const who = [
    customer.name && `Name: ${customer.name}`,
    customer.city && `City: ${customer.city}`,
    customer.address && `Address: ${customer.address}`,
  ].filter(Boolean) as string[];
  if (who.length) lines.push("", ...who);
  lines.push("", "Payment: cash on delivery. Please confirm availability.");
  return lines.join("\n");
}

export function waLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
