"use client";

import { useState } from "react";
import { Check, CreditCard, Landmark, MessageCircle } from "lucide-react";
import {
  type Currency,
  type Plan,
  type PlanId,
  deviceConnectionLabel,
  formatPlanPrice,
  plans,
} from "@/lib/plans";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "Card Payment", label: "Card", icon: CreditCard },
  { id: "PayPal", label: "PayPal", icon: MessageCircle },
  { id: "Bank Transfer", label: "Bank", icon: Landmark },
  { id: "Revolut", label: "Revolut", icon: CreditCard },
] as const;

export function PlanCheckout() {
  const [name, setName] = useState("");
  const [device, setDevice] = useState("");
  const [connections, setConnections] = useState<1 | 2>(1);
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [error, setError] = useState("");

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const isPaid = selectedPlan ? selectedPlan.basePriceGbp > 0 : false;
  const detailsReady = name.trim().length > 0 && device.trim().length > 0;

  const selectPlan = (planId: PlanId) => {
    if (!detailsReady) {
      setError("Please enter your name and device before selecting a plan.");
      return;
    }
    setError("");
    setSelectedPlanId(planId);
    if (planId === "trial") setPaymentMethod("");
  };

  const checkout = () => {
    if (!selectedPlan) {
      setError("Please select a plan.");
      return;
    }
    if (!detailsReady) {
      setError("Please enter your name and device.");
      return;
    }
    if (isPaid && !paymentMethod) {
      setError("Please choose a payment method.");
      return;
    }

    const url = buildWhatsAppUrl(siteConfig.whatsappNumber, {
      name: name.trim(),
      device: device.trim(),
      connections: selectedPlan.id === "trial" ? 1 : connections,
      plan: selectedPlan,
      currency,
      paymentMethod: paymentMethod || undefined,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Plans</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
          Pick the plan that fits
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Prices adjust by currency and connections. Checkout opens WhatsApp with your order
          ready to send.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {(["GBP", "USD", "EUR"] as Currency[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition",
              currency === c
                ? "bg-accent text-white"
                : "border border-white/10 text-muted hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mx-auto mt-6 max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/50 sm:col-span-1"
        />
        <input
          type="text"
          placeholder="Device (Firestick, Smart TV, PC…)"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/50 sm:col-span-1"
        />
        <select
          value={connections}
          disabled={selectedPlanId === "trial"}
          onChange={(e) => setConnections(Number(e.target.value) as 1 | 2)}
          className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/50 disabled:opacity-50 sm:col-span-1"
        >
          <option value={1}>1 device</option>
          <option value={2}>2 devices</option>
        </select>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currency={currency}
            selected={selectedPlanId === plan.id}
            disabled={!detailsReady}
            connections={connections}
            onSelect={() => selectPlan(plan.id)}
          />
        ))}
      </div>

      {selectedPlan ? (
        <div className="card mx-auto mt-12 max-w-3xl p-8">
          <h2 className="text-lg font-semibold">How you&apos;d like to pay</h2>
          <p className="mt-2 text-sm text-muted">
            {isPaid
              ? "Choose a method — we'll send instructions on WhatsApp after you submit."
              : "No payment needed for the free trial. Just continue to WhatsApp."}
          </p>

          {isPaid ? (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border px-5 py-4 text-xs font-semibold uppercase tracking-wide transition",
                    paymentMethod === method.id
                      ? "border-accent bg-accent-dim text-accent"
                      : "border-white/10 hover:border-white/20",
                  )}
                >
                  <method.icon className="h-5 w-5" />
                  {method.label}
                </button>
              ))}
            </div>
          ) : null}

          <button type="button" onClick={checkout} className="btn-primary mt-8 w-full py-4">
            <MessageCircle className="h-5 w-5" />
            Continue on WhatsApp
          </button>
        </div>
      ) : null}
    </div>
  );
}

function PlanCard({
  plan,
  currency,
  selected,
  disabled,
  connections,
  onSelect,
}: {
  plan: Plan;
  currency: Currency;
  selected: boolean;
  disabled: boolean;
  connections: 1 | 2;
  onSelect: () => void;
}) {
  const price = formatPlanPrice(plan.basePriceGbp, currency);
  const connectionNote = deviceConnectionLabel(connections, plan.id);
  const displayFeatures =
    plan.id === "trial"
      ? plan.features.filter((f) => !f.startsWith("Log in"))
      : [...plan.features.filter((f) => !f.startsWith("Log in")), connectionNote];

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "card flex h-full flex-col p-5 text-left transition",
        selected && "border-accent/50 ring-1 ring-accent/40",
        disabled ? "cursor-not-allowed opacity-50" : "hover:border-accent/30",
      )}
    >
      {plan.badge ? (
        <span className="mb-2 inline-block w-fit text-[10px] font-bold uppercase tracking-widest text-warm">
          {plan.badge}
        </span>
      ) : null}
      <h3 className="text-base font-semibold">{plan.title}</h3>
      <p className="mt-2 text-2xl font-bold text-accent">
        {price}
        {plan.basePriceGbp > 0 ? (
          <span className="block text-xs font-normal text-muted">{plan.period}</span>
        ) : null}
      </p>
      <ul className="mt-4 flex-1 space-y-2 text-xs leading-relaxed text-muted">
        {displayFeatures.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <span
        className={cn(
          "mt-4 block rounded-lg py-2 text-center text-xs font-semibold uppercase tracking-wide",
          selected ? "bg-accent text-white" : "border border-white/10 text-muted",
        )}
      >
        {selected ? "Selected" : "Select"}
      </span>
    </button>
  );
}
