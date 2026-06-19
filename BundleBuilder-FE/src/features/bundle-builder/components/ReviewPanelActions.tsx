import { Button } from "@/components/ui/button";

import { formatCurrency } from "../utils/formatters";
import { financingMonthlyLabel } from "../constants/review-panel.constants";

import satisfactionBadgeImage from "../assets/images/satisfactionBadge.png";

type ReviewPanelActionsProps = {
  subtotal: number;
  compareTotal: number;
  savings: number;
  actionMessage: string | null;
  onCheckout: () => void;
  onSave: () => void;
};

export function ReviewPanelActions({
  subtotal,
  compareTotal,
  savings,
  actionMessage,
  onCheckout,
  onSave,
}: ReviewPanelActionsProps) {
  return (
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
        Congrats! You&apos;re saving {formatCurrency(savings)} on your security
        bundle!
      </p>

      <Button
        type="button"
        className="bg-bundle-brand hover:bg-bundle-brand-hover mt-2 h-[47px] w-full rounded-[4px] text-[17px] font-bold text-white"
        onClick={onCheckout}
      >
        Checkout
      </Button>

      <button
        type="button"
        className="text-bundle-muted mx-auto mt-2 block cursor-pointer border-0 bg-transparent p-0 text-center text-sm leading-4 italic underline underline-offset-2"
        onClick={onSave}
      >
        Save my system for later
      </button>

      {actionMessage ? (
        <p
          className="text-bundle-muted mt-1 text-center text-xs"
          aria-live="polite"
        >
          {actionMessage}
        </p>
      ) : null}
    </div>
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
