import { cn } from "@/lib/utils";

import { fulfillmentItems } from "../apis/bundle-builder-data";
import type { ReviewLineItem } from "../types/bundle-builder";
import { formatCurrency, formatMonthlyPrice } from "../utils/formatters";
import { reviewSeparator } from "../constants/review-panel.constants";

import ShippingTruckIcon from "../assets/icons/shipping-truck.svg?react";
import WyzeShieldIcon from "../assets/icons/wyze-shield.svg?react";

type ReviewPlanSectionProps = {
  plan?: ReviewLineItem;
};

export function ReviewPlanSection({ plan }: ReviewPlanSectionProps) {
  if (!plan && fulfillmentItems.length === 0) {
    return null;
  }

  return (
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
            <WyzeShieldIcon className="h-6 w-5 shrink-0" aria-hidden="true" />
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
            index < fulfillmentItems.length - 1 && `pb-3 ${reviewSeparator}`,
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
  );
}
