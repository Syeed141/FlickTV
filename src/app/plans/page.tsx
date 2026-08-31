import type { Metadata } from "next";
import { PlanCheckout } from "@/components/plan-checkout";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description: "Choose your FlickTv plan — free trial or paid subscriptions with WhatsApp checkout.",
};

export default function PlansPage() {
  return <PlanCheckout />;
}
