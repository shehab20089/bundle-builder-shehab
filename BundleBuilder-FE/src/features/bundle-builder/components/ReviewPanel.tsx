import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { fulfillmentItems } from "../apis/bundle-builder-data";
import type { ReviewLineItem, StepId } from "../types/bundle-builder";
import { ProductVisual } from "./ProductVisual";
import { QuantityStepper } from "./QuantityStepper";

import ShippingTruckIcon from "../../../../Icons/shipping-truck.svg?react";
import WyzeShieldIcon from "../../../../Icons/wyze-shield.svg?react";
import satisfactionBadgeImage from "../../../../Images/satisfactionBadge.png";

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

const reviewSeparator = "border-b border-[#CBD5E1]";
const financingMonthlyLabel = "$19.19/mo";

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
      <div className="flex flex-col">
        <p className="-ms-1.25 mb-6.25 text-xs tracking-[0.18em] text-[#484848] uppercase">
          Review
        </p>
        <h2
          id="review-heading"
          className="text-[22px] tracking-tight text-[#1F1F1F]"
        >
          Your security system
        </h2>
        <p className="max-w-87.5 text-sm leading-snug text-[#1F1F1F]/75">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <Separator className="mt-2.5 mb-3.75 bg-blue-100" />

      <div className="flex flex-col gap-[15px]">
        {reviewGroups.map((group) => {
          const items = lineItems.filter((item) => item.stepId === group.id);

          if (items.length === 0) {
            return null;
          }

          return (
            <section
              key={group.id}
              className={cn("flex flex-col gap-2 pb-4", reviewSeparator)}
            >
              <h3 className="text-xs text-[#A8B2BD]">{group.label}</h3>
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

        {plan || fulfillmentItems.length > 0 ? (
          <section className="flex flex-col gap-2">
            <h3 className="text-xs leading-none text-[#A8B2BD]">PLAN</h3>
            {plan ? (
              <div
                className={cn(
                  "flex items-start justify-between gap-3 pb-3",
                  fulfillmentItems.length > 0 && reviewSeparator,
                )}
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  <WyzeShieldIcon
                    className="h-6 w-5 shrink-0"
                    aria-hidden="true"
                  />
                  <p
                    className="min-w-0 truncate text-[16px] leading-none tracking-[-0.002em]"
                    style={{
                      fontFamily: "'Gilroy-Bold', var(--font-gilroy)",
                      fontWeight: 400,
                    }}
                  >
                    <span className="text-[#0B0D10]">Cam </span>
                    <span className="text-[var(--bundle-purple)]">
                      Unlimited
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end text-sm leading-none">
                  <span className="text-[#484848] line-through">$12.99/mo</span>
                  <span className="font-semibold text-[var(--bundle-purple)]">
                    $9.99/mo
                  </span>
                </div>
              </div>
            ) : null}
            {fulfillmentItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center justify-between gap-3 text-[12px]",
                  index < fulfillmentItems.length - 1 &&
                    `pb-3 ${reviewSeparator}`,
                )}
              >
                <div className="flex items-center gap-2.5 text-[#0B0D10]">
                  <ShippingTruckIcon
                    className="size-[41px] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] leading-4 tracking-[0.005em] text-[#0B0D10]">
                    {item.label}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col items-end text-sm leading-none">
                  <span className="text-[#484848] line-through">
                    {currencyFormatter.format(item.compareAt)}
                  </span>
                  <span className="font-semibold text-[var(--bundle-purple)]">
                    FREE
                  </span>
                </div>
              </div>
            ))}
          </section>
        ) : null}
      </div>

      <div className="mt-3">
        <div className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-2">
          <GuaranteeBadge />

          <div className="flex min-w-0 flex-col items-end pt-2">
            <div className="rounded-[3px] bg-[var(--bundle-purple)] px-2 py-[5px] text-xs leading-none tracking-[-0.01em] whitespace-nowrap text-white">
              as low as {financingMonthlyLabel}
            </div>
            <div className="mt-2 flex items-baseline justify-end gap-1.5 whitespace-nowrap">
              <span className="text-2xl leading-none text-[#707780] line-through">
                {currencyFormatter.format(compareTotal)}
              </span>
              <span className="text-[30px] leading-none font-bold tracking-[-0.04em] text-[var(--bundle-purple)]">
                {currencyFormatter.format(subtotal)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-xs leading-3 font-bold tracking-[-0.01em] text-[#0AA288]">
          Congrats! You&apos;re saving {currencyFormatter.format(savings)} on
          your security bundle!
        </p>

        <Button className="mt-2 h-[47px] w-full rounded-[4px] bg-[var(--bundle-purple)] text-[20px] font-bold text-white hover:bg-[var(--bundle-purple-dark)]">
          Checkout
        </Button>

        <a
          href="#save-system"
          className="mt-2 block text-center text-sm leading-4 text-[#484848] italic underline underline-offset-2"
        >
          Save my system for later
        </a>
      </div>
    </aside>
  );
}

function GuaranteeBadge() {
  return (
    <img
      src={satisfactionBadgeImage}
      alt="100% Wyze satisfaction guarantee"
      className="size-[72px] shrink-0 object-contain"
      draggable={false}
    />
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
        <ProductVisual
          kind={item.visual}
          imageSrc={item.imageSrc}
          alt={item.title}
          compact
          className="size-7"
        />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-[#0B0D10]">{item.title}</p>
        {/* {item.variantLabel ? (
          <p className="text-[10px] font-medium text-slate-400">
            {item.variantLabel}
          </p>
        ) : null} */}
      </div>
      <QuantityStepper
        compact
        value={item.quantity}
        label={item.title}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />
      <div className="min-w-14 text-right text-sm leading-tight">
        {item.compareAt && item.compareAt > item.price ? (
          <div className="text-slate-400 line-through">
            {currencyFormatter.format(item.compareAt)}
          </div>
        ) : null}
        <div className="text-[var(--bundle-purple)]">
          {item.price === 0 ? "FREE" : currencyFormatter.format(item.price)}
        </div>
      </div>
    </div>
  );
}
