import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ProductVariant } from "../types/bundle-builder";

type ProductVariantSelectorProps = {
  variants: ProductVariant[];
  activeVariantId: string;
  onSelectVariant: (variantId: string) => void;
};

export function ProductVariantSelector({
  variants,
  activeVariantId,
  onSelectVariant,
}: ProductVariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1" aria-label="Color options">
      {variants.map((variant) => {
        const selected = variant.id === activeVariantId;

        return (
          <Button
            key={variant.id}
            type="button"
            variant="outline"
            size="xs"
            className={cn(
              "h-[30px] gap-1 rounded-[2px] border-slate-200 bg-white px-1.5 pr-2 text-[9.5px] font-medium text-[#1F1F1F] shadow-none hover:bg-slate-50",
              selected &&
                "border-bundle-success bg-bundle-success-soft text-bundle-obsidian hover:bg-bundle-success-soft",
            )}
            aria-pressed={selected}
            onClick={() => onSelectVariant(variant.id)}
          >
            {variant.imageSrc ? (
              <img
                src={variant.imageSrc}
                alt=""
                className="size-[26px] shrink-0 object-contain"
                draggable={false}
              />
            ) : (
              <span
                className={cn(
                  "size-2 rounded-full border border-slate-200",
                  variant.swatch,
                )}
              />
            )}
            {variant.label}
          </Button>
        );
      })}
    </div>
  );
}
