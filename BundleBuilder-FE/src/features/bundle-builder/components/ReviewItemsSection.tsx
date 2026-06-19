import { cn } from "@/lib/utils";

import type { ReviewLineItem } from "../types/bundle-builder";
import { ReviewLine } from "./ReviewLine";
import { reviewGroups, reviewSeparator } from "./review-panel.constants";

type ReviewItemsSectionProps = {
  lineItems: ReviewLineItem[];
  onDecrement: (productId: string, variantId: string) => void;
  onIncrement: (productId: string, variantId: string) => void;
};

export function ReviewItemsSection({
  lineItems,
  onDecrement,
  onIncrement,
}: ReviewItemsSectionProps) {
  return (
    <>
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
    </>
  );
}
