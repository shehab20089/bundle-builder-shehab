import type { ComponentType, SVGProps } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { bundleSteps } from "../apis/bundle-builder-data";
import CameraStepIcon from "../assets/icons/camera.svg?react";
import ProtectionStepIcon from "../assets/icons/extra-protection.svg?react";
import PlanStepIcon from "../assets/icons/plan-shield.svg?react";
import SensorsStepIcon from "../assets/icons/sensors.svg?react";
import { ProductCard } from "../components/ProductCard";
import { ReviewPanel } from "../components/ReviewPanel";
import { useBundleBuilder } from "../hooks/use-bundle-builder";
import type { StepId } from "../types/bundle-builder";

const stepIcons: Record<StepId, ComponentType<SVGProps<SVGSVGElement>>> = {
  cameras: CameraStepIcon,
  plan: PlanStepIcon,
  sensors: SensorsStepIcon,
  protection: ProtectionStepIcon,
};

export function BundleBuilderRoute() {
  const builder = useBundleBuilder();

  return (
    <main className="bg-background text-bundle-obsidian min-h-screen">
      <div className="mx-auto grid w-full max-w-325 gap-6 px-0 py-8 sm:px-0 lg:grid-cols-[minmax(0,768px)_390px] lg:items-start lg:gap-7 lg:px-8 lg:py-12">
        <h1 className="text-center text-3xl font-black tracking-tight sm:text-4xl lg:sr-only">
          Let&apos;s get started!
        </h1>

        <section aria-label="Bundle builder">
          <Accordion
            type="single"
            value={builder.openStep}
            onValueChange={(value) => {
              if (value) {
                builder.setOpenStep(value as StepId);
              }
            }}
            className="gap-[13px] bg-white"
          >
            {bundleSteps.map((step) => {
              const StepIcon = stepIcons[step.id];
              const selectedCount = builder.selectedCountForStep(step.id);

              return (
                <AccordionItem
                  key={step.id}
                  value={step.id}
                  className="group border-bundle-accordion-line data-[state=open]:bg-bundle-panel data-[state=open]:shadow-bundle-open overflow-hidden transition-colors data-[state=closed]:border-b data-[state=open]:rounded-lg data-[state=open]:border-none"
                >
                  <div className="text-bundle-muted flex h-[33px] items-center px-[15px] text-[10px] leading-none font-medium tracking-[1.6px] uppercase group-data-[state=open]:text-[12px]">
                    Step {step.stepNumber} of {bundleSteps.length}
                  </div>
                  <AccordionTrigger className="border-bundle-accordion-line [&_[data-slot=accordion-trigger-icon]]:text-bundle-brand items-center rounded-none border-x-0 border-t border-b-0 px-[15px] py-5 text-left hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!ml-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <StepIcon className="size-5 shrink-0 text-slate-300" />
                      <span className="text-bundle-obsidian truncate text-[22px] font-semibold tracking-tight">
                        {step.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "text-bundle-brand mr-1 ml-auto text-sm font-medium",
                        selectedCount === 0 && "text-slate-400",
                      )}
                    >
                      {selectedCount} selected
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <div className="px-3 pt-2 pb-3">
                      <div
                        className={cn(
                          "grid grid-cols-1 gap-2.5",
                          (step.id === "cameras" || step.id === "sensors") &&
                            "sm:grid-cols-2",
                        )}
                      >
                        {step.products.map((product, productIndex) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            className={cn(
                              step.id === "cameras" &&
                                productIndex === step.products.length - 1 &&
                                step.products.length % 2 === 1 &&
                                "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.3125rem)]",
                            )}
                            activeVariantId={builder.getActiveVariantId(
                              product,
                            )}
                            activeQuantity={builder.getActiveQuantity(product)}
                            totalQuantity={builder.getProductTotalQuantity(
                              product,
                            )}
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
                        <div className="mt-[15px] flex justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-bundle-brand text-bundle-brand hover:bg-bundle-brand/10 hover:text-bundle-brand rounded-[5px h-[39px] cursor-pointer rounded-md bg-transparent px-5 text-lg font-semibold shadow-none"
                            onClick={() => builder.goToNextStep(step.id)}
                          >
                            {step.nextLabel}
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
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
          onSave={builder.saveCurrentConfiguration}
        />
      </div>
    </main>
  );
}
