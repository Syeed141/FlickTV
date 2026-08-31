import type { Metadata } from "next";
import { FAQ } from "@/components/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about FlickTv plans, devices, and checkout.",
};

export default function FaqPage() {
  return (
    <div className="pt-16">
      <FAQ />
    </div>
  );
}
