import { CheckCircle2Icon, TruckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { fulfillmentItems } from "../apis/bundle-builder-data";
import type { ReviewLineItem, StepId } from "../types/bundle-builder";
import { ProductVisual } from "./ProductVisual";
import { QuantityStepper } from "./QuantityStepper";

type ReviewPanelProps = {
  lineItems: ReviewLineItem[];
  subtotal: number;
  compareTotal: number;
  onDecrement: (productId: string, variantId: string) => void;
  onIncrement: (productId: string, variantId: string) => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const reviewGroups: Array<{ id: StepId; label: string }> = [
  { id: "cameras", label: "CAMERAS" },
  { id: "sensors", label: "SENSORS" },
  { id: "protection", label: "ACCESSORIES" },
];

export function ReviewPanel({
  lineItems,
  subtotal,
  compareTotal,
  onDecrement,
  onIncrement,
}: ReviewPanelProps) {
  const savings = Math.max(0, compareTotal - subtotal);
  const plan = lineItems.find((item) => item.stepId === "plan");

  return (
    <aside
      className="rounded-lg bg-[var(--bundle-panel)] p-5 text-slate-950 lg:sticky lg:top-6"
      aria-labelledby="review-heading"
    >
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">
          Review
        </p>
        <h2 id="review-heading" className="text-xl font-black tracking-tight">
          Your security system
        </h2>
        <p className="max-w-[24rem] text-[11px] leading-snug text-slate-500">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <Separator className="my-4 bg-blue-100" />

      <div className="flex flex-col gap-4">
        {reviewGroups.map((group) => {
          const items = lineItems.filter((item) => item.stepId === group.id);

          if (items.length === 0) {
            return null;
          }

          return (
            <section key={group.id} className="flex flex-col gap-2">
              <h3 className="text-[10px] font-bold text-slate-400">
                {group.label}
              </h3>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <ReviewLine
                    key={item.key}
                    item={item}
                    onDecrement={() =>
                      onDecrement(item.productId, item.variantId)
                    }
                    onIncrement={() =>
                      onIncrement(item.productId, item.variantId)
                    }
                  />
                ))}
              </div>
            </section>
          );
        })}

        {plan ? (
          <section className="flex flex-col gap-2">
            <h3 className="text-[10px] font-bold text-slate-400">
              HOME MONITORING PLAN
            </h3>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-black text-[var(--bundle-purple)]">
                <CheckCircle2Icon className="size-4 text-blue-300" />
                {plan.title}
              </div>
              <div className="text-right text-[11px]">
                <span className="text-slate-400 line-through">$120.00/mo</span>{" "}
                <span className="font-black text-[var(--bundle-purple)]">
                  $99/mo
                </span>
              </div>
            </div>
          </section>
        ) : null}

        <section className="flex flex-col gap-2">
          {fulfillmentItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <span className="flex size-7 items-center justify-center rounded-md bg-white text-teal-400">
                  <TruckIcon className="size-4" />
                </span>
                {item.label}
              </div>
              <div className="text-right text-[11px]">
                <span className="text-slate-400 line-through">
                  {currencyFormatter.format(item.compareAt)}
                </span>{" "}
                <span className="font-black text-[var(--bundle-purple)]">
                  FREE
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[120px_1fr] sm:items-center lg:grid-cols-1">
        <div className="flex size-24 rotate-[-10deg] items-center justify-center rounded-full bg-[var(--bundle-purple)] p-3 text-center text-[11px] leading-tight font-black text-white shadow-lg shadow-violet-200 [clip-path:polygon(50%_0%,61%_12%,78%_7%,84%_23%,100%_32%,91%_49%,100%_66%,84%_75%,78%_93%,61%_88%,50%_100%,39%_88%,22%_93%,16%_75%,0_66%,9%_49%,0_32%,16%_23%,22%_7%,39%_12%)]">
          100%
          <br />
          worry-free
          <br />
          guarantee
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-right">
            <span className="mr-2 text-sm text-slate-400 line-through">
              {currencyFormatter.format(compareTotal)}
            </span>
            <span className="text-2xl font-black text-[var(--bundle-purple)]">
              {currencyFormatter.format(subtotal)}
            </span>
          </div>
          <p className="rounded bg-teal-50 py-1 text-center text-[11px] font-bold text-teal-500">
            Compared: You&apos;re saving {currencyFormatter.format(savings)} on
            your security bundle!
          </p>
          <Button className="h-10 w-full rounded-md bg-[var(--bundle-purple)] text-sm font-black text-white hover:bg-[var(--bundle-purple-dark)]">
            Checkout
          </Button>
          <a
            href="#save-system"
            className="text-center text-[11px] font-medium text-slate-500 underline underline-offset-2"
          >
            Save my system for later
          </a>
        </div>
      </div>
    </aside>
  );
}

type ReviewLineProps = {
  item: ReviewLineItem;
  onDecrement: () => void;
  onIncrement: () => void;
};

function ReviewLine({ item, onDecrement, onIncrement }: ReviewLineProps) {
  return (
    <div className="grid grid-cols-[2rem_1fr_auto_auto] items-center gap-2 text-sm">
      <span className="flex size-8 items-center justify-center rounded-md bg-white">
        <ProductVisual kind={item.visual} compact />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-bold text-slate-800">
          {item.title}
        </p>
        {item.variantLabel ? (
          <p className="text-[10px] font-medium text-slate-400">
            {item.variantLabel}
          </p>
        ) : null}
      </div>
      <QuantityStepper
        compact
        value={item.quantity}
        label={item.title}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />
      <div className="min-w-14 text-right text-[11px] leading-tight">
        {item.compareAt && item.compareAt > item.price ? (
          <div className="text-slate-400 line-through">
            {currencyFormatter.format(item.compareAt)}
          </div>
        ) : null}
        <div className="font-black text-[var(--bundle-purple)]">
          {item.price === 0 ? "FREE" : currencyFormatter.format(item.price)}
        </div>
      </div>
    </div>
  );
}
