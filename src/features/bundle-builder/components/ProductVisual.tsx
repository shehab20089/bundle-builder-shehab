import { ShieldCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ProductVisualKind } from "../types/bundle-builder";

type ProductVisualProps = {
  kind: ProductVisualKind;
  compact?: boolean;
  className?: string;
  imageSrc?: string;
  alt?: string;
};

export function ProductVisual({
  kind,
  compact = false,
  className,
  imageSrc,
  alt = "",
}: ProductVisualProps) {
  const frameClassName = cn(
    "relative flex items-center justify-center",
    compact ? "size-9" : "h-20 w-full",
    className,
  );
  const fallbackFrameClassName = cn(
    frameClassName,
    compact ? "[&>*]:scale-[0.45]" : "[&>*]:scale-[0.92]",
  );

  if (imageSrc) {
    return (
      <div className={frameClassName}>
        <img
          src={imageSrc}
          alt={alt}
          className="h-full max-h-full w-full max-w-full object-contain"
          draggable={false}
        />
      </div>
    );
  }

  if (kind === "cam-v4") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="absolute bottom-4 h-2 w-12 rounded-full bg-slate-200 blur-[2px]" />
        <div className="relative size-12 rounded-full bg-zinc-950 shadow-lg ring-4 shadow-slate-300 ring-white">
          <div className="absolute top-4 left-4 size-4 rounded-full border border-slate-600 bg-zinc-800">
            <div className="absolute top-1 left-1 size-1.5 rounded-full bg-cyan-300" />
          </div>
          <div className="absolute bottom-1 left-1/2 h-4 w-1 -translate-x-1/2 rounded-full bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (kind === "cam-pan") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="relative h-20 w-16">
          <div className="absolute top-1 left-3 size-10 rounded-lg bg-slate-100 shadow-xl ring-1 shadow-slate-300 ring-slate-200">
            <div className="absolute top-3 left-3 size-4 rounded-full bg-zinc-900">
              <div className="absolute top-1.5 left-1.5 size-1 rounded-full bg-cyan-300" />
            </div>
          </div>
          <div className="absolute bottom-3 left-1 h-7 w-14 rounded-xl bg-white shadow-lg ring-1 ring-slate-200" />
          <div className="absolute bottom-0 left-4 h-4 w-8 rounded-b-lg bg-slate-200" />
        </div>
      </div>
    );
  }

  if (kind === "floodlight") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="relative h-20 w-24">
          <div className="absolute top-3 left-4 h-10 w-8 rotate-[-14deg] rounded-xl bg-white shadow-lg ring-1 ring-slate-200" />
          <div className="absolute top-3 right-4 h-10 w-8 rotate-[14deg] rounded-xl bg-white shadow-lg ring-1 ring-slate-200" />
          <div className="absolute bottom-2 left-1/2 h-12 w-7 -translate-x-1/2 rounded-lg bg-slate-100 shadow-lg ring-1 ring-slate-200">
            <div className="absolute bottom-2 left-2 size-3 rounded-full bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "doorbell") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="relative h-20 w-20">
          <div className="absolute top-4 left-2 h-14 w-6 rounded-md bg-zinc-950 shadow-lg">
            <div className="absolute top-2 left-2 size-2 rounded-full bg-cyan-300" />
            <div className="absolute bottom-2 left-1.5 size-3 rounded-full border border-violet-500" />
          </div>
          <div className="absolute top-8 right-4 h-10 w-7 rounded-md bg-zinc-900 shadow-lg">
            <div className="absolute inset-x-1 top-2 h-px bg-slate-600" />
          </div>
          <div className="absolute top-8 left-0 h-px w-8 bg-teal-300" />
        </div>
      </div>
    );
  }

  if (kind === "battery-cam") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="relative h-20 w-16">
          <div className="absolute top-4 left-5 h-14 w-8 rotate-[-12deg] rounded-md bg-white shadow-xl ring-1 ring-slate-200">
            <div className="absolute top-2 left-2 size-4 rounded-full bg-zinc-950" />
            <div className="absolute bottom-2 left-2 h-1.5 w-4 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "plan") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="flex size-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-500">
          <ShieldCheckIcon />
        </div>
      </div>
    );
  }

  if (kind === "motion-sensor") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="size-11 rounded-lg bg-slate-100 shadow-sm ring-1 ring-slate-200">
          <div className="m-2 size-7 rounded-md bg-white ring-1 ring-slate-200" />
        </div>
      </div>
    );
  }

  if (kind === "hub") {
    return (
      <div className={fallbackFrameClassName} aria-hidden="true">
        <div className="h-8 w-12 rounded-md bg-white shadow-md ring-1 ring-slate-200">
          <div className="mx-auto mt-3 h-1 w-7 rounded-full bg-slate-300" />
        </div>
      </div>
    );
  }

  return (
    <div className={fallbackFrameClassName} aria-hidden="true">
      <div className="grid size-11 grid-cols-2 gap-0.5 rounded-sm bg-zinc-950 p-1 shadow-md">
        <div className="rounded-[2px] bg-zinc-700" />
        <div className="rounded-[2px] bg-zinc-700" />
        <div className="rounded-[2px] bg-zinc-700" />
        <div className="rounded-[2px] bg-zinc-700" />
      </div>
    </div>
  );
}
