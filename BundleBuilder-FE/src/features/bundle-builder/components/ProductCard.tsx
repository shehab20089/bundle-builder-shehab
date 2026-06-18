import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { BundleProduct } from "../types/bundle-builder";
import { ProductVisual } from "./ProductVisual";
import { QuantityStepper } from "./QuantityStepper";

type ProductCardProps = {
  product: BundleProduct;
  activeVariantId: string;
  activeQuantity: number;
  totalQuantity: number;
  className?: string;
  onSelectVariant: (variantId: string) => void;
  onDecrement: () => void;
  onIncrement: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductCard({
  product,
  activeVariantId,
  activeQuantity,
  totalQuantity,
  className,
  onSelectVariant,
  onDecrement,
  onIncrement,
}: ProductCardProps) {
  const isSelected = totalQuantity > 0;
  const activeVariant = product.variants?.find(
    (variant) => variant.id === activeVariantId,
  );
  const productImageSrc = product.imageSrc ?? activeVariant?.imageSrc;
  const supportsQuantity = product.supportsQuantity !== false;

  return (
    <article
      className={cn(
        "shadow-bundle-card relative grid min-h-[136px] grid-cols-[92px_minmax(0,1fr)] gap-[19px] rounded-[10px] border-2 bg-white p-2.5 transition",
        isSelected
          ? "border-bundle-brand/70"
          : "border-transparent hover:border-violet-100",
        className,
      )}
    >
      {product.badge ? (
        <Badge className="bg-bundle-brand absolute top-2.5 left-2.5 h-[19px] rounded-full px-2 text-xs leading-none font-normal text-white shadow-none">
          {product.badge}
        </Badge>
      ) : null}

      <div className="flex min-h-[112px] items-center justify-center pt-5">
        <ProductVisual
          kind={product.visual}
          imageSrc={productImageSrc}
          alt={product.title}
          className="h-[82px] w-[82px]"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-2.5">
        <div className="flex min-h-[54px] flex-col gap-2">
          <h3 className="text-bundle-heading truncate text-base leading-tight">
            {product.title}
          </h3>
          <p className="text-bundle-heading/75 text-xs leading-[1.22] font-normal">
            {product.description}{" "}
            {product.learnMore ? (
              <a href="#bundle-details" className="text-bundle-link underline">
                {product.learnMore}
              </a>
            ) : null}
          </p>
        </div>

        {product.variants ? (
          <div className="flex flex-wrap gap-1" aria-label="Color options">
            {product.variants.map((variant) => {
              const selected = variant.id === activeVariantId;

              return (
                <Button
                  key={variant.id}
                  type="button"
                  variant="outline"
                  size="xs"
                  className={cn(
                    "h-[30px] gap-1 rounded-[2px] border-slate-200 bg-white px-1.5 pr-2 text-[9.5px] font-bold text-slate-700 shadow-none hover:bg-slate-50",
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
        ) : null}

        <div
          className={cn(
            "mt-auto flex items-end gap-2",
            supportsQuantity ? "justify-between" : "justify-end",
          )}
        >
          {supportsQuantity ? (
            <QuantityStepper
              value={activeQuantity}
              label={product.title}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
            />
          ) : null}

          <div className="text-right leading-none">
            {product.price > 0 &&
            product.compareAt &&
            product.compareAt > product.price ? (
              <div className="text-bundle-danger mb-[3px] text-base leading-none line-through">
                {currencyFormatter.format(product.compareAt)}
              </div>
            ) : null}
            <div className="text-bundle-price text-base leading-none">
              {product.price === 0
                ? "FREE"
                : currencyFormatter.format(product.price)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
