"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the free trial work?",
    a: "Pick the Free Trial plan, send your details via WhatsApp, and our team sets you up. No payment needed to try it.",
  },
  {
    q: "Which devices are supported?",
    a: "Firestick, Android TV, Samsung/LG Smart TVs, phones, tablets, PCs, and MAG boxes. We send device-specific setup steps after checkout.",
  },
  {
    q: "How many devices can I use?",
    a: "Paid plans support 1 or 2 registered devices, but only one stream at a time. The trial is limited to one connection.",
  },
  {
    q: "How do I pay?",
    a: "After choosing a plan, you'll confirm via WhatsApp. We support card, PayPal, bank transfer, and Revolut — instructions are sent personally.",
  },
  {
    q: "Is there catch-up TV?",
    a: "Yes — up to 7 days on supported channels, plus cloud PVR on eligible bouquets.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Before you get started</h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4 shrink-0 text-accent" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/8 px-5 pb-4 pt-3 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
