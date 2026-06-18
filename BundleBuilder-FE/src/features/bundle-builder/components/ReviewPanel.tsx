import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { fulfillmentItems } from "../apis/bundle-builder-data";
import type { ReviewLineItem, StepId } from "../types/bundle-builder";
import { formatCurrency, formatMonthlyPrice } from "../utils/formatters";
import { ProductVisual } from "./ProductVisual";
import { QuantityStepper } from "./QuantityStepper";

import ShippingTruckIcon from "../assets/icons/shipping-truck.svg?react";
import WyzeShieldIcon from "../assets/icons/wyze-shield.svg?react";
import satisfactionBadgeImage from "../assets/images/satisfactionBadge.png";

type ReviewPanelProps = {
  lineItems: ReviewLineItem[];
  subtotal: number;
  compareTotal: number;
  onDecrement: (productId: string, variantId: string) => void;
  onIncrement: (productId: string, variantId: string) => void;
  onSave: () => void;
};

const reviewGroups: Array<{ id: StepId; label: string }> = [
  { id: "cameras", label: "CAMERAS" },
  { id: "sensors", label: "SENSORS" },
  { id: "protection", label: "ACCESSORIES" },
];

const reviewSeparator = "border-b border-bundle-divider";
const financingMonthlyLabel = "$19.19/mo";

export function ReviewPanel({
  lineItems,
  subtotal,
  compareTotal,
  onDecrement,
  onIncrement,
  onSave,
}: ReviewPanelProps) {
  const savings = Math.max(0, compareTotal - subtotal);
  const plan = lineItems.find((item) => item.stepId === "plan");

  return (
    <aside
      className="bg-bundle-panel text-bundle-obsidian rounded-lg p-5 lg:sticky lg:top-6"
      aria-labelledby="review-heading"
    >
      <div className="flex flex-col">
        <p className="text-bundle-muted -ms-1.25 mb-6.25 text-xs tracking-[0.18em] uppercase">
          Review
        </p>
        <h2
          id="review-heading"
          className="text-bundle-heading text-[22px] tracking-tight"
        >
          Your security system
        </h2>
        <p className="text-bundle-heading/75 max-w-87.5 text-sm leading-snug">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <Separator className="bg-bundle-divider mt-2.5 mb-3.75" />

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
              <h3 className="text-bundle-section text-xs">{group.label}</h3>
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
            <h3 className="text-bundle-section text-xs leading-none">PLAN</h3>
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
                  <p className="font-gilroy-bold min-w-0 truncate text-[16px] leading-none font-normal tracking-[-0.002em]">
                    <span className="text-bundle-obsidian">Cam </span>
                    <span className="text-bundle-brand">Unlimited</span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end text-sm leading-none">
                  <span className="text-bundle-muted line-through">
                    {plan.compareAt ? formatMonthlyPrice(plan.compareAt) : ""}
                  </span>
                  <span className="text-bundle-brand font-semibold">
                    {formatMonthlyPrice(plan.price)}
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
                <div className="text-bundle-obsidian flex items-center gap-2.5">
                  <ShippingTruckIcon
                    className="size-[41px] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-bundle-obsidian text-[14px] leading-4 tracking-[0.005em]">
                    {item.label}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col items-end text-sm leading-none">
                  <span className="text-bundle-muted line-through">
                    {formatCurrency(item.compareAt)}
                  </span>
                  <span className="text-bundle-brand font-semibold">FREE</span>
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
            <div className="bg-bundle-brand rounded-[3px] px-2 py-[5px] text-xs leading-none tracking-[-0.01em] whitespace-nowrap text-white">
              as low as {financingMonthlyLabel}
            </div>
            <div className="mt-2 flex items-baseline justify-end gap-1.5 whitespace-nowrap">
              <span className="text-bundle-price-muted text-2xl leading-none line-through">
                {formatCurrency(compareTotal)}
              </span>
              <span className="text-bundle-brand text-[30px] leading-none font-bold tracking-[-0.04em]">
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-bundle-success mt-2 text-center text-xs leading-3 font-bold tracking-[-0.01em]">
          Congrats! You&apos;re saving {formatCurrency(savings)} on your
          security bundle!
        </p>

        <Button className="bg-bundle-brand hover:bg-bundle-brand-hover mt-2 h-[47px] w-full rounded-[4px] text-[17px] font-bold text-white">
          Checkout
        </Button>

        <button
          type="button"
          className="text-bundle-muted mx-auto mt-2 block cursor-pointer border-0 bg-transparent p-0 text-center text-sm leading-4 italic underline underline-offset-2"
          onClick={onSave}
        >
          Save my system for later
        </button>
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
        <p className="text-bundle-obsidian text-sm">{item.title}</p>
        {item.variantLabel ? (
          <p className="text-bundle-muted text-[10px] leading-none">
            {item.variantLabel}
          </p>
        ) : null}
      </div>
      <QuantityStepper
        compact
        surface="review"
        value={item.quantity}
        label={item.title}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />
      <div className="min-w-14 text-right text-sm leading-tight">
        {item.compareAt && item.compareAt > item.price ? (
          <div className="text-bundle-price-muted line-through">
            {formatCurrency(item.compareAt)}
          </div>
        ) : null}
        <div className="text-bundle-brand font-semibold">
          {item.price === 0 ? "FREE" : formatCurrency(item.price)}
        </div>
      </div>
    </div>
  );
}
