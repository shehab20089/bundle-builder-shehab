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
  className?: string
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
  className,
  onSelectVariant,
  onDecrement,
  onIncrement,
}: ProductCardProps) {
  const isSelected = totalQuantity > 0

  return (
    <article
      className={cn(
        "relative grid min-h-[136px] grid-cols-[92px_minmax(0,1fr)] gap-2.5 rounded-lg border-2 bg-white p-2.5 shadow-[0_8px_18px_rgba(39,52,86,0.05)] transition",
        isSelected
          ? "border-[var(--bundle-purple)]"
          : "border-transparent hover:border-violet-100",
        className,
      )}
    >
      {product.badge ? (
        <Badge className="absolute left-2.5 top-2.5 h-[18px] rounded-full bg-[var(--bundle-purple)] px-2 text-[9px] font-black leading-none text-white shadow-none">
          {product.badge}
        </Badge>
      ) : null}

      <div className="flex min-h-[112px] items-center justify-center pt-5">
        <ProductVisual kind={product.visual} className="h-[82px] w-[82px]" />
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex min-h-[54px] flex-col gap-1">
          <h3 className="truncate text-[12.5px] font-black leading-tight text-slate-950">
            {product.title}
          </h3>
          <p className="line-clamp-2 max-w-[190px] text-[9.5px] font-medium leading-[1.22] text-slate-500">
            {product.description}{" "}
            {product.learnMore ? (
              <a
                href="#bundle-details"
                className="font-black text-[var(--bundle-purple)] underline underline-offset-2"
              >
                {product.learnMore}
              </a>
            ) : null}
          </p>
        </div>

        {product.variants ? (
          <div className="flex flex-wrap gap-1" aria-label="Color options">
            {product.variants.map((variant) => {
              const selected = variant.id === activeVariantId

              return (
                <Button
                  key={variant.id}
                  type="button"
                  variant="outline"
                  size="xs"
                  className={cn(
                    "h-[21px] gap-1 rounded border-slate-200 bg-white px-2 text-[9.5px] font-bold text-slate-700 shadow-none hover:bg-slate-50",
                    selected &&
                      "border-teal-300 bg-teal-50 text-slate-900 hover:bg-teal-50",
                  )}
                  aria-pressed={selected}
                  onClick={() => onSelectVariant(variant.id)}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full border border-slate-200",
                      variant.swatch,
                    )}
                  />
                  {variant.label}
                </Button>
              )
            })}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-2">
          <QuantityStepper
            value={activeQuantity}
            label={product.title}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />

          <div className="text-right leading-none">
            {product.compareAt && product.compareAt > product.price ? (
              <div className="text-[11px] font-black text-red-400 line-through">
                {currencyFormatter.format(product.compareAt)}
              </div>
            ) : null}
            <div className="text-[12.5px] font-black text-slate-700">
              {product.price === 0
                ? "FREE"
                : currencyFormatter.format(product.price)}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
