import type { ReviewLineItem } from "../types/bundle-builder";
import { formatCurrency } from "../utils/formatters";
import { ProductVisual } from "./ProductVisual";
import { QuantityStepper } from "./QuantityStepper";

type ReviewLineProps = {
  item: ReviewLineItem;
  onDecrement: () => void;
  onIncrement: () => void;
};

export function ReviewLine({
  item,
  onDecrement,
  onIncrement,
}: ReviewLineProps) {
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
        <p className="text-bundle-obsidian text-sm font-medium">{item.title}</p>
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
          <div className="text-bundle-price-muted font-medium line-through">
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
