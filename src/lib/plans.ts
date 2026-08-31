export type Currency = "GBP" | "USD" | "EUR";

export type PlanId = "trial" | "monthly" | "quarterly" | "biannual" | "annual";

export type Plan = {
  id: PlanId;
  title: string;
  basePriceGbp: number;
  period: string;
  badge?: string;
  popular?: boolean;
  features: string[];
};

const sharedFeatures = [
  "Full HD & 4K where available",
  "7-day catch-up & cloud PVR",
  "Daily-updated VOD library",
  "Electronic program guide (EPG)",
  "24/7 setup & support",
];

export const plans: Plan[] = [
  {
    id: "trial",
    title: "Free Trial",
    basePriceGbp: 0,
    period: "limited access",
    features: [
      "28,000+ live channels",
      "HD & 4K streaming",
      "VOD movies & series",
      "EPG TV guide",
      "1 connection (trial limit)",
    ],
  },
  {
    id: "monthly",
    title: "Monthly",
    basePriceGbp: 12,
    period: "per month",
    features: ["20,000+ live channels", ...sharedFeatures, "1 simultaneous stream"],
  },
  {
    id: "quarterly",
    title: "3 Months",
    basePriceGbp: 30,
    period: "per 3 months",
    features: ["20,000+ live channels", ...sharedFeatures, "1 simultaneous stream"],
  },
  {
    id: "biannual",
    title: "6 Months",
    basePriceGbp: 40,
    period: "per 6 months",
    features: ["20,000+ live channels", ...sharedFeatures, "1 simultaneous stream"],
  },
  {
    id: "annual",
    title: "Annual",
    basePriceGbp: 60,
    period: "per year",
    badge: "Best value",
    popular: true,
    features: [
      "20,000+ live channels",
      ...sharedFeatures,
      "1 simultaneous stream",
      "Save ~58% vs monthly",
      "Priority support queue",
    ],
  },
];

export const currencyRates: Record<Currency, number> = {
  GBP: 1,
  USD: 1.33,
  EUR: 1.15,
};

export const currencySymbols: Record<Currency, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

export function formatPlanPrice(basePriceGbp: number, currency: Currency): string {
  if (basePriceGbp === 0) return "Free";
  const converted = Math.round(basePriceGbp * currencyRates[currency]);
  return `${currencySymbols[currency]}${converted}`;
}

export function deviceConnectionLabel(count: 1 | 2, planId: PlanId): string {
  if (planId === "trial") return "1 connection (trial limit)";
  return count === 2
    ? "Log in on 2 devices — 1 stream at a time"
    : "Log in on 1 device — 1 stream at a time";
}
