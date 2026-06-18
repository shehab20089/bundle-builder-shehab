import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { formatCurrency } from "../utils/formatters";

type CheckoutSuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subtotal: number;
  compareTotal: number;
  savings: number;
};

export function CheckoutSuccessDialog({
  open,
  onOpenChange,
  subtotal,
  compareTotal,
  savings,
}: CheckoutSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-bundle-divider max-w-[410px] overflow-hidden rounded-[10px] bg-white p-0 shadow-[0_26px_70px_rgb(11_13_16_/_24%)]">
        <div className="bg-bundle-panel px-6 pt-7 pb-5 text-center">
          <div className="shadow-bundle-card relative mx-auto grid size-20 place-items-center rounded-full bg-white">
            <span className="bg-bundle-success/20 animate-bundle-check-ring absolute inset-0 rounded-full" />
            <span className="bg-bundle-success animate-bundle-check-pop relative grid size-14 place-items-center rounded-full text-white shadow-[0_12px_26px_rgb(10_162_136_/_24%)]">
              <CheckIcon className="size-8 stroke-[3]" aria-hidden="true" />
            </span>
          </div>

          <DialogHeader className="mt-4">
            <DialogTitle className="font-gilroy-bold text-bundle-obsidian text-[24px] leading-none font-normal tracking-[-0.01em]">
              Bundle ready
            </DialogTitle>
            <DialogDescription className="text-bundle-heading/75 mx-auto mt-2 max-w-[285px] text-sm leading-snug">
              Your configured security system is ready. This prototype stops
              before payment.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex flex-col gap-4 px-6 pt-5 pb-6">
          <div className="border-bundle-divider rounded-[8px] border bg-white">
            <div className="border-bundle-divider flex items-end justify-between gap-4 border-b px-4 py-3">
              <div>
                <p className="text-bundle-section text-[10px] leading-none tracking-[0.18em] uppercase">
                  Configured total
                </p>
                <p className="text-bundle-brand mt-1 text-[24px] leading-none font-bold tracking-[-0.03em]">
                  {formatCurrency(subtotal)}
                </p>
              </div>
              <p className="text-bundle-price-muted text-lg leading-none line-through">
                {formatCurrency(compareTotal)}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="text-bundle-section text-[10px] leading-none tracking-[0.18em] uppercase">
                Bundle savings
              </p>
              <p className="text-bundle-success text-[20px] leading-none font-bold tracking-[-0.02em]">
                {formatCurrency(savings)}
              </p>
            </div>
          </div>

          <p className="text-bundle-muted text-center text-xs leading-snug">
            No payment was processed.
          </p>

          <DialogFooter className="mt-0 flex-row justify-stretch gap-2 sm:justify-stretch">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-bundle-brand text-bundle-brand hover:bg-bundle-panel h-11 flex-1 rounded-[4px] bg-white text-[14px] font-bold shadow-none"
              >
                Keep editing
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-bundle-brand hover:bg-bundle-brand-hover h-11 flex-1 rounded-[4px] text-[14px] font-bold text-white"
              >
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
