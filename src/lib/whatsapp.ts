import { type Currency, type Plan, currencySymbols, formatPlanPrice } from "./plans";

type CheckoutPayload = {
  name: string;
  device: string;
  connections: 1 | 2;
  plan: Plan;
  currency: Currency;
  paymentMethod?: string;
};

export function buildWhatsAppUrl(number: string, payload: CheckoutPayload): string {
  const price = formatPlanPrice(payload.plan.basePriceGbp, payload.currency);
  const isPaid = payload.plan.basePriceGbp > 0;

  const lines = [
    `Hello, I'd like to get started with ${payload.plan.title} on FlickTv.`,
    "",
    `Name: ${payload.name}`,
    `Device: ${payload.device}`,
    `Connections: ${payload.connections}`,
    `Plan: ${payload.plan.title}`,
    `Price: ${price}${isPaid ? ` (${payload.plan.period})` : ""}`,
  ];

  if (isPaid && payload.paymentMethod) {
    lines.push(`Payment preference: ${payload.paymentMethod}`);
  }

  const text = lines.join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
