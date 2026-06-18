import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  label: string;
  compact?: boolean;
  surface?: "default" | "review";
  onDecrement: () => void;
  onIncrement: () => void;
};

export function QuantityStepper({
  value,
  label,
  compact = false,
  surface = "default",
  onDecrement,
  onIncrement,
}: QuantityStepperProps) {
  const isReviewSurface = surface === "review";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md text-[11px] font-semibold text-slate-700",
        compact ? "gap-1" : "gap-1.5",
      )}
      aria-label={label}
    >
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        className={cn(
          "size-[18px] rounded text-[#525963] shadow-none [&_svg:not([class*='size-'])]:size-2",
          isReviewSurface
            ? "border-none bg-white hover:bg-white"
            : "bg-[#F0F4F7] hover:bg-slate-50",
        )}
        aria-label={`Decrease ${label}`}
        disabled={value === 0}
        onClick={onDecrement}
      >
        <MinusIcon data-icon="inline-start" strokeWidth={"3px"} />
      </Button>
      <span
        className={cn("min-w-3 text-center text-[10px]", compact && "min-w-2")}
      >
        {value}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        className={cn(
          "size-5 rounded-[4px] border-none text-[#525963] shadow-none [&_svg:not([class*='size-'])]:size-2",
          isReviewSurface
            ? "bg-white hover:bg-white"
            : "bg-[#F0F4F7] hover:bg-slate-50",
        )}
        aria-label={`Increase ${label}`}
        onClick={onIncrement}
      >
        <PlusIcon data-icon="inline-start " strokeWidth={"3px"} />
      </Button>
    </div>
  );
}
