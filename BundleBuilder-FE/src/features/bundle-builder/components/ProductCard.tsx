import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { BundleProduct } from "../types/bundle-builder"
import { ProductVisual } from "./ProductVisual"
import { QuantityStepper } from "./QuantityStepper"

type ProductCardProps = {
  product: BundleProduct
  activeVariantId: string
  activeQuantity: number
  totalQuantity: number
  onSelectVariant: (variantId: string) => void
  onDecrement: () => void
  onIncrement: () => void
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export function ProductCard({
  product,
  activeVariantId,
  activeQuantity,
  totalQuantity,
  onSelectVariant,
  onDecrement,
  onIncrement,
}: ProductCardProps) {
  const isSelected = totalQuantity > 0

  return (
    <article
      className={cn(
        "relative flex min-h-[190px] flex-col rounded-xl border bg-white p-3 shadow-sm transition",
        isSelected
          ? "border-[var(--bundle-purple)] shadow-[0_0_0_1px_var(--bundle-purple)]"
          : "border-white hover:border-violet-200",
      )}
    >
      {product.badge ? (
        <Badge className="absolute left-2 top-2 h-5 rounded-full bg-[var(--bundle-purple)] px-2 text-[10px] font-bold text-white shadow-none">
          {product.badge}
        </Badge>
      ) : null}

      <ProductVisual kind={product.visual} />

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-[13px] font-bold leading-tight text-slate-950">
            {product.title}
          </h3>
          <p className="min-h-8 text-[10.5px] leading-snug text-slate-500">
            {product.description}{" "}
            {product.learnMore ? (
              <a
                href="#bundle-details"
                className="font-bold text-[var(--bundle-purple)] underline underline-offset-2"
              >
                {product.learnMore}
              </a>
            ) : null}
          </p>
        </div>

        {product.variants ? (
          <div className="flex flex-wrap gap-1.5" aria-label="Color options">
            {product.variants.map((variant) => {
              const selected = variant.id === activeVariantId

              return (
                <Button
                  key={variant.id}
                  type="button"
                  variant="outline"
                  size="xs"
                  className={cn(
                    "h-5 gap-1 rounded-md border-slate-200 bg-white px-2 text-[10px] font-semibold text-slate-700 shadow-none hover:bg-slate-50",
                    selected &&
                      "border-teal-300 bg-teal-50 text-slate-900 hover:bg-teal-50",
                  )}
                  aria-pressed={selected}
                  onClick={() => onSelectVariant(variant.id)}
                >
                  <span
                    className={cn(
                      "size-2.5 rounded-full border border-slate-200",
                      variant.swatch,
                    )}
                  />
                  {variant.label}
                </Button>
              )
            })}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3">
          <QuantityStepper
            value={activeQuantity}
            label={product.title}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />

          <div className="text-right leading-none">
            {product.compareAt && product.compareAt > product.price ? (
              <div className="text-xs font-bold text-red-400 line-through">
                {currencyFormatter.format(product.compareAt)}
              </div>
            ) : null}
            <div className="text-sm font-bold text-slate-700">
              {product.price === 0 ? "FREE" : currencyFormatter.format(product.price)}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
