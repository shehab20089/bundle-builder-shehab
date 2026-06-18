import {
  CameraIcon,
  GiftIcon,
  RadioTowerIcon,
  ShieldIcon,
} from "lucide-react"
import type { CSSProperties } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { bundleSteps } from "../apis/bundle-builder-data"
import { useBundleBuilder } from "../hooks/use-bundle-builder"
import type { StepId } from "../types/bundle-builder"
import { ProductCard } from "./ProductCard"
import { ReviewPanel } from "./ReviewPanel"

const stepIcons = {
  cameras: CameraIcon,
  plan: ShieldIcon,
  sensors: RadioTowerIcon,
  protection: GiftIcon,
}

export function BundleBuilderScreen() {
  const builder = useBundleBuilder()

  return (
    <main
      className="min-h-screen bg-white text-slate-950"
      style={{
        "--bundle-panel": "#eef6ff",
        "--bundle-purple": "#5634e8",
        "--bundle-purple-dark": "#4528c9",
        "--bundle-border": "#d7dce7",
      } as CSSProperties}
    >
      <div className="mx-auto grid w-full max-w-[1160px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,760px)_320px] lg:items-start lg:gap-7 lg:px-8 lg:py-12">
        <h1 className="text-center text-3xl font-black tracking-tight sm:text-4xl lg:sr-only">
          Let&apos;s get started!
        </h1>

        <section aria-label="Bundle builder">
          <Accordion
            type="single"
            value={builder.openStep}
            onValueChange={(value) => {
              if (value) {
                builder.setOpenStep(value as StepId)
              }
            }}
            className="overflow-hidden rounded-lg bg-white"
          >
            {bundleSteps.map((step) => {
              const StepIcon = stepIcons[step.id]
              const selectedCount = builder.selectedCountForStep(step.id)

              return (
                <AccordionItem
                  key={step.id}
                  value={step.id}
                  className="border-b border-[var(--bundle-border)] last:border-b"
                >
                  <div className="px-3 pt-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Step {step.stepNumber} of {bundleSteps.length}
                  </div>
                  <AccordionTrigger className="rounded-none px-3 py-2 text-left hover:no-underline [&_[data-slot=accordion-trigger-icon]]:text-[var(--bundle-purple)]">
                    <div className="flex min-w-0 items-center gap-2">
                      <StepIcon className="size-5 shrink-0 text-slate-300" />
                      <span className="truncate text-xl font-black tracking-tight text-slate-950">
                        {step.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "ml-auto mr-2 text-[11px] font-bold text-[var(--bundle-purple)]",
                        selectedCount === 0 && "text-slate-400",
                      )}
                    >
                      {selectedCount} selected
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <div className="rounded-b-lg bg-[var(--bundle-panel)] px-3 pb-3 pt-2">
                      <div
                        className={cn(
                          "grid gap-2.5",
                          step.id === "cameras"
                            ? "sm:grid-cols-2"
                            : "sm:grid-cols-2 lg:grid-cols-1",
                        )}
                      >
                        {step.products.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            activeVariantId={builder.getActiveVariantId(product)}
                            activeQuantity={builder.getActiveQuantity(product)}
                            totalQuantity={builder.getProductTotalQuantity(product)}
                            onSelectVariant={(variantId) =>
                              builder.selectVariant(product.id, variantId)
                            }
                            onDecrement={() =>
                              builder.updateQuantity(product.id, -1)
                            }
                            onIncrement={() =>
                              builder.updateQuantity(product.id, 1)
                            }
                          />
                        ))}
                      </div>

                      {step.nextLabel ? (
                        <div className="mt-4 flex justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            className="h-8 rounded-md border-[var(--bundle-purple)] bg-white px-5 text-xs font-black text-[var(--bundle-purple)] shadow-none hover:bg-violet-50"
                            onClick={() => builder.goToNextStep(step.id)}
                          >
                            {step.nextLabel}
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </section>

        <ReviewPanel
          lineItems={builder.selectedLineItems}
          subtotal={builder.subtotal}
          compareTotal={builder.compareTotal}
          onDecrement={(productId, variantId) =>
            builder.updateQuantity(productId, -1, variantId)
          }
          onIncrement={(productId, variantId) =>
            builder.updateQuantity(productId, 1, variantId)
          }
        />
      </div>
    </main>
  )
}
