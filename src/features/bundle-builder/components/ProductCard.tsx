import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { BundleProduct } from "../types/bundle-builder";
import { ProductPrice } from "./ProductPrice";
import { ProductVariantSelector } from "./ProductVariantSelector";
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
          <ProductVariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId}
            onSelectVariant={onSelectVariant}
          />
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

          <ProductPrice price={product.price} compareAt={product.compareAt} />
        </div>
      </div>
    </article>
  );
}
