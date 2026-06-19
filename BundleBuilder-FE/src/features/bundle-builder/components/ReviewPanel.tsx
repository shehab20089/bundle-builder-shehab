import { useState } from "react";

import { Separator } from "@/components/ui/separator";

import type { ReviewLineItem } from "../types/bundle-builder";
import { CheckoutSuccessDialog } from "./CheckoutSuccessDialog";
import { ReviewItemsSection } from "./ReviewItemsSection";
import { ReviewPanelActions } from "./ReviewPanelActions";
import { ReviewPanelHeader } from "./ReviewPanelHeader";
import { ReviewPlanSection } from "./ReviewPlanSection";

type ReviewPanelProps = {
  lineItems: ReviewLineItem[];
  subtotal: number;
  compareTotal: number;
  onDecrement: (productId: string, variantId: string) => void;
  onIncrement: (productId: string, variantId: string) => void;
  onSave: () => boolean;
};

export function ReviewPanel({
  lineItems,
  subtotal,
  compareTotal,
  onDecrement,
  onIncrement,
  onSave,
}: ReviewPanelProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const savings = Math.max(0, compareTotal - subtotal);
  const plan = lineItems.find((item) => item.stepId === "plan");

  function handleCheckout() {
    setActionMessage(null);
    setCheckoutOpen(true);
  }

  function handleSave() {
    const saved = onSave();

    setActionMessage(
      saved
        ? "Your system has been saved for later."
        : "We could not save your system. Please try again.",
    );
  }

  return (
    <>
      <aside
        className="bg-bundle-panel text-bundle-obsidian rounded-lg p-5 lg:sticky lg:top-6"
        aria-labelledby="review-heading"
      >
        <ReviewPanelHeader />

        <Separator className="bg-bundle-divider mt-2.5 mb-3.75" />

        <div className="flex flex-col gap-[15px]">
          <ReviewItemsSection
            lineItems={lineItems}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />
          <ReviewPlanSection plan={plan} />
        </div>

        <ReviewPanelActions
          subtotal={subtotal}
          compareTotal={compareTotal}
          savings={savings}
          actionMessage={actionMessage}
          onCheckout={handleCheckout}
          onSave={handleSave}
        />
      </aside>

      <CheckoutSuccessDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        subtotal={subtotal}
        compareTotal={compareTotal}
        savings={savings}
      />
    </>
  );
}
