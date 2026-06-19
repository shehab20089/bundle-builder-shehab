import type { StepId } from "../types/bundle-builder";

export const reviewGroups: Array<{ id: StepId; label: string }> = [
  { id: "cameras", label: "CAMERAS" },
  { id: "sensors", label: "SENSORS" },
  { id: "protection", label: "ACCESSORIES" },
];

export const reviewSeparator = "border-b border-bundle-divider";
export const financingMonthlyLabel = "$19.19/mo";
