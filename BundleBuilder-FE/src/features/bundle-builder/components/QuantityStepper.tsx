import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  label: string;
  compact?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
};

export function QuantityStepper({
  value,
  label,
  compact = false,
  onDecrement,
  onIncrement,
}: QuantityStepperProps) {
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
        className="size-[18px] rounded bg-[#F0F4F7] text-[#525963] shadow-none hover:bg-slate-50 [&_svg:not([class*='size-'])]:size-2"
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
        className="size-5 rounded-[4px] border-none bg-[#F0F4F7] text-[#525963] shadow-none hover:bg-slate-50 [&_svg:not([class*='size-'])]:size-2"
        aria-label={`Increase ${label}`}
        onClick={onIncrement}
      >
        <PlusIcon data-icon="inline-start " strokeWidth={"3px"} />
      </Button>
    </div>
  );
}
